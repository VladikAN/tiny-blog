using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using TinyBlog.DataServices.Services;
using TinyBlog.DataServices.Services.Dto;
using TinyBlog.Web.Configuration.Settings;
using TinyBlog.Web.ViewModels;

namespace TinyBlog.Web.Services
{
    public sealed class AuthService : IAuthService
    {
        private const int TokenLifetimeMinutes = 10;

        private readonly IEmailService _emailService;
        private readonly IUserDataService _userDataSerice;
        private readonly IAuthSettings _authSettings;
        private readonly ILogger _logger;

        public AuthService(
            IEmailService emailService,
            IUserDataService userDataService,
            IAuthSettings authSettings,
            ILogger<AuthService> logger)
        {
            _emailService = emailService;
            _userDataSerice = userDataService;
            _authSettings = authSettings;
            _logger = logger;
        }

        public async Task<AuthResponseViewModel> TryAuthorize(string username, string password)
        {
            var user = await _userDataSerice.GetCredentials(username);
            if (user == null || user.IsLocked)
            {
                _logger.LogInformation($"Failed attempt to authorize with '{username}'. User was not found or not active.");
                return null;
            }

            var hashed = GetHash(password, user.PasswordSalt);
            var success = user.PasswordHash.Equals(hashed, StringComparison.Ordinal);
            if (success)
            {
                _logger.LogInformation($"Successful attempt to authorize with '{username}'");
                if (user.ChangePasswordRequired)
                {
                    _logger.LogInformation($"User {username} promted to change current password");
                    return AuthResponseViewModel.ChangePassword(username, user.ChangePasswordToken);
                }

                var jwtExpiration = DateTime.UtcNow.AddMinutes(TokenLifetimeMinutes);
                var jwtToken = GetToken(user, jwtExpiration);
                var refreshToken = Guid.NewGuid().ToString("N");
                await _userDataSerice.SetRefreshToken(username, refreshToken);

                return AuthResponseViewModel.Authorized(username, jwtToken, refreshToken, jwtExpiration);
            }
            else
            {
                _logger.LogWarning($"Failed attempt to authorize with '{username}'. Wrong password");
                await _userDataSerice.PutFailedLogin(username);
            }
            
            return null;
        }

        public async Task<AuthResponseViewModel> RefreshJwt(string refreshToken)
        {
            var user = await _userDataSerice.GetCredentialsByRefresh(refreshToken);
            if (user == null || user.IsLocked)
            {
                _logger.LogInformation($"Failed attempt to refresh JWT. User was not found or not active.");
                return null;
            }

            var jwtExpiration = DateTime.UtcNow.AddMinutes(TokenLifetimeMinutes);
            var jwtToken = GetToken(user, jwtExpiration);
            var newToken = Guid.NewGuid().ToString("N");
            await _userDataSerice.SetRefreshToken(user.Username, newToken);

            return AuthResponseViewModel.Authorized(user.Username, jwtToken, newToken, jwtExpiration);
        }

        public async Task<bool> TryChangePassword(string username, string password, string token)
        {
            var user = await _userDataSerice.GetCredentials(username);
            if (user == null || user.IsLocked)
            {
                _logger.LogInformation($"Failed attempt to change password for '{username}'. User was not found or not active.");
                return false;
            }

            if (user.ChangePasswordRequired && user.ChangePasswordToken == token)
            {
                var salt = GetSalt();
                var hash = GetHash(password, salt);
                return await _userDataSerice.SaveNewCredentials(username, hash, salt);
            }

            _logger.LogInformation($"Requested for password change is not allowed for user ${username}");
            await _userDataSerice.PutFailedLogin(username);

            return false;
        }

        public async Task<bool> SaveUser(UserViewModel model)
        {
            var dto = model.BuildDto();
            var user = await _userDataSerice.Get(dto.Username);

            string tmpPassword = null;
            string hash = null;
            string salt = null;
            var createFlow = false;

            if (user == null)
            {
                createFlow = true;
                tmpPassword = Guid.NewGuid().ToString("N").Substring(20);
                salt = GetSalt();
                hash = GetHash(tmpPassword, salt);
            }

            var created = await _userDataSerice.Save(dto, hash, salt);
            if (createFlow && created)
            {
                await _emailService.NewUser(dto.Username, dto.Email, tmpPassword);
            }

            return created;
        }

        private string GetToken(AuthDto auth, DateTime expires)
        {
            var key = Encoding.UTF8.GetBytes(_authSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = _authSettings.Issuer,
                Audience = _authSettings.Audience,
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, auth.Username),
                    new Claim(ClaimTypes.Email, auth.Email)
                }),
                Expires = expires,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        private string GetHash(string password, string salt)
        {
            return Convert.ToBase64String(
                KeyDerivation.Pbkdf2(
                    password,
                    Convert.FromBase64String(salt),
                    KeyDerivationPrf.HMACSHA1,
                    iterationCount: 10000,
                    numBytesRequested: 256 / 8));
        }

        private string GetSalt()
        {
            byte[] salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            return Convert.ToBase64String(salt);
        }
    }
}

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
            if (user == null)
            {
                _logger.LogInformation($"Failed authorize attempt with '{username}'. User not found or not active.");
                return null;
            }

            var hashed = GetHash(password, user.PasswordSalt);
            var success = user.PasswordHash.Equals(hashed, StringComparison.Ordinal);
            _logger.LogInformation(success
                ? $"Successful autorize attempt with '{username}'."
                : $"Failed authorize attempt with '{username}'. Wrong password");
            
            if (success)
            {
                var token = GetToken(user);
                return new AuthResponseViewModel(username, token);
            }
            
            return null;
        }

        public async Task<bool> UpdateUser(UserViewModel model)
        {
            var dto = model.BuildDto();

            var user = await _userDataSerice.Get(dto.Username);
            if (user == null)
            {
                // New user flow
                var tmpPassword = new Guid().ToString("N").Substring(0, 7);
                var salt = GetSalt();
                var hash = GetHash(tmpPassword, salt);
                var created = await _userDataSerice.Save(dto, hash, salt);
                if (created)
                {
                    await _emailService.NewUser(dto.Username, dto.Email, tmpPassword);
                }

                return created;
            }
            else
            {
                return await _userDataSerice.Save(dto);
            }
        }

        private string GetToken(AuthDto auth)
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
                Expires = DateTime.UtcNow.AddDays(7),
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

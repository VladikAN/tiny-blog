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
        private readonly IUserDataService _userDataSerice;
        private readonly IAuthSettings _authSettings;
        private readonly ILogger _logger;

        public AuthService(
            IUserDataService userDataService,
            IAuthSettings authSettings,
            ILogger<AuthService> logger)
        {
            _userDataSerice = userDataService;
            _authSettings = authSettings;
            _logger = logger;
        }

        public async Task<UserViewModel> TryAuthorize(string email, string password)
        {
            var user = await _userDataSerice.GetCredentials(email);
            if (user == null)
            {
                _logger.LogInformation($"Failed authorize attempt with '{email}'. User not found or not active.");
                return null;
            }

            var salt = Convert.FromBase64String(user.PasswordSalt);
            var hashed = Convert.ToBase64String(
                KeyDerivation.Pbkdf2(
                    password,
                    salt,
                    KeyDerivationPrf.HMACSHA1,
                    iterationCount: 10000,
                    numBytesRequested: 256 / 8));

            var success = user.PasswordHash.Equals(hashed, StringComparison.Ordinal);
            _logger.LogInformation(success
                ? $"Successful autorize attempt with '{email}'."
                : $"Failed authorize attempt with '{email}'. Wrong password");
            
            if (success)
            {
                var token = GetToken(user);
                return new UserViewModel(email, token);
            }
            
            return null;
        }

        private string GetToken(UserDto user)
        {
            var key = Encoding.UTF8.GetBytes(_authSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = _authSettings.Issuer,
                Audience = _authSettings.Audience,
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Email)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
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

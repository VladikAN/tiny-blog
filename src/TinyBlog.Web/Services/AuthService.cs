using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using TinyBlog.DataServices.Services;

namespace TinyBlog.Web.Services
{
    public sealed class AuthService : IAuthService
    {
        private readonly IUserDataSerice _userDataSerice;
        private readonly ILogger _logger;

        public AuthService(
            IUserDataSerice userDataService,
            ILogger<AuthService> logger)
        {
            _userDataSerice = userDataService;
            _logger = logger;
        }

        public async Task<bool> TryAuthorize(string email, string password)
        {
            var user = await _userDataSerice.GetCredentials(email);
            if (user == null)
            {
                _logger.LogInformation($"Failed authorize attempt with '{email}'. User not found or not active.");
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

            return success;
        }
    }
}

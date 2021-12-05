using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TinyBlog.DataServices.Entities;
using TinyBlog.DataServices.Extensions;
using TinyBlog.DataServices.Services.Dto;
using TinyBlog.DataServices.Settings;

namespace TinyBlog.DataServices.Services
{
    public class UserDataService : BaseDataService, IUserDataService
    {
        private const string CollectionName = "users";

        private readonly ILogger _logger;

        public UserDataService(
            IDatabaseSettings settings,
            ILogger<UserDataService> logger) : base(settings)
        {
            _logger = logger;
        }

        public async Task<AuthDto> GetCredentials(string username)
        {
            var queryParam = username.Trim().ToLower();
            var userQuery = await DataCollection().FindAsync(usr => usr.Username == queryParam && usr.IsActive);
            var user = await userQuery.FirstOrDefaultAsync();
            return user?.BuildAuthDto();
        }

        public async Task<AuthDto> GetByRefresh(string refreshToken)
        {
            var now = DateTime.UtcNow;
            var userQuery = await DataCollection().FindAsync(usr => 
                usr.Refresh != null
                && usr.Refresh.Token == refreshToken
                && usr.Refresh.Expires > now
                && usr.IsActive);
            var user = await userQuery.FirstOrDefaultAsync();
            return user?.BuildAuthDto();
        }

        public async Task<bool> Save(string username, string passwordHash, string passwordSalt)
        {
            var entity = await GetByUsername(username);
            if (entity == null || !entity.IsActive)
            {
                return false;
            }

            var definition = Builders<User>.Update
                .Set(x => x.PasswordHash, passwordHash)
                .Set(x => x.PasswordSalt, passwordSalt)
                .Set(x => x.ChangePassword, null);

            var options = new UpdateOptions { IsUpsert = false };
            await DataCollection().UpdateOneAsync(pst => pst.EntityId == entity.EntityId, definition, options);
            _logger.LogInformation($"The password was changed for user {username}");

            return true;
        }

        public async Task<UserDto[]> GetAll()
        {
            var options = new FindOptions<User> { Sort = Builders<User>.Sort.Descending(x => x.Username) };
            var data = await DataCollection().FindAsync(FilterDefinition<User>.Empty, options);
            return data.ToList().Select(pst => pst.BuildDto()).ToArray();
        }

        public async Task<UserDto> Get(string username)
        {
            var user = await GetByUsername(username);
            return user?.BuildDto();
        }

        public async Task<bool> SetActivity(string username, bool isActive)
        {
            var entity = await GetByUsername(username);
            if (entity == null|| entity.IsSuper)
            {
                return false;
            }

            var definition = Builders<User>.Update
                .Set(x => x.IsActive, isActive);

            var options = new UpdateOptions { IsUpsert = false };
            await DataCollection().UpdateOneAsync(pst => pst.EntityId == entity.EntityId, definition, options);
            _logger.LogInformation($"User {entity.Username} has changed activity flag to '{isActive}'");

            return true;
        }

        public async Task<bool> Delete(string username)
        {
            var entity = await GetByUsername(username);
            if (entity == null || entity.IsSuper)
            {
                return false;
            }

            var options = new UpdateOptions { IsUpsert = false };
            await DataCollection().DeleteOneAsync(pst => pst.EntityId == entity.EntityId);
            _logger.LogInformation($"User {entity.Username} was deleted");

            return true;
        }

        public async Task<bool> Save(UserDto dto, string hash = null, string salt = null)
        {
            var entity = await GetByUsername(dto.Username);
            var isCreate = entity == null;

            var definition = Builders<User>.Update
                .Set(x => x.Email, dto.Email);

            if (isCreate)
            {
                if (string.IsNullOrWhiteSpace(hash))
                {
                    throw new ArgumentNullException(nameof(hash));
                }

                if (string.IsNullOrWhiteSpace(salt))
                {
                    throw new ArgumentNullException(nameof(salt));
                }

                definition = definition
                    .Set(x => x.Username, dto.Username)
                    .Set(x => x.IsActive, true)
                    .Set(x => x.PasswordHash, hash)
                    .Set(x => x.PasswordSalt, salt)
                    .Set(x => x.ChangePassword, new SecurityToken
                    {
                        Token = Guid.NewGuid().ToString("N"),
                        Expires = DateTime.UtcNow.AddMinutes(AuthConsts.ChangePasswordExpiration)
                    })
                    .Set(x => x.Refresh, null);
            }

            var options = new UpdateOptions { IsUpsert = true };
            var result = await DataCollection().UpdateOneAsync(pst => pst.Username == dto.Username, definition, options);
            _logger.LogInformation($"User {dto.Username} was saved");

            return true;
        }

        public async Task SetRefreshToken(string username, string token)
        {
            var user = await GetByUsername(username);
            var definition = Builders<User>.Update
                .Set(x => x.Refresh, new SecurityToken
                {
                    Token = token,
                    Expires = DateTime.UtcNow.AddMinutes(AuthConsts.JwtRefreshTokenExpiration)
                });

            var options = new UpdateOptions { IsUpsert = false };
            await DataCollection().UpdateOneAsync(pst => pst.EntityId == user.EntityId, definition, options);
        }
        
        public async Task PutFailedLogin(string username)
        {
            var user = await GetByUsername(username);
            var logins = new List<DateTime>(user.FailedLogins ?? new DateTime[0]);
            logins.Add(DateTime.UtcNow);

            var definition = Builders<User>.Update
                .Set(x => x.FailedLogins, logins.TakeLast(AuthConsts.FailedLoginAttempts + 1));

            var options = new UpdateOptions { IsUpsert = false };
            await DataCollection().UpdateOneAsync(pst => pst.EntityId == user.EntityId, definition, options);
        }

        private async Task<User> GetByUsername(string username)
        {
            var queryParam = username.Trim().ToLower();
            var data = await DataCollection().FindAsync(pst => pst.Username == queryParam);
            return await data.FirstOrDefaultAsync();
        }

        private IMongoCollection<User> DataCollection() => Repository.GetCollection<User>(CollectionName);
    }
}

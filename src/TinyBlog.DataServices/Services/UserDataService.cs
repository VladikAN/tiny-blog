using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using System;
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

        private ILogger _logger;

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
            _logger.LogInformation($"User '{entity.Username}' has changed activity flag to {isActive}");

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
            _logger.LogInformation($"User '{entity.Username}' was deleted");

            return true;
        }

        public async Task<bool> Save(UserDto dto, string hash = null, string salt = null)
        {
            var entity = await GetByUsername(dto.Username);
            var isCreate = entity == null;

            var definition = Builders<User>.Update
                .Set(x => x.Email, dto.Email);

            if(isCreate || !entity.IsSuper)
            {
                definition
                    .Set(x => x.Username, dto.Username);
            }

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

                definition
                    .Set(x => x.IsActive, true)
                    .Set(x => x.PasswordHash, hash)
                    .Set(x => x.PasswordSalt, salt);
            }

            var options = new UpdateOptions { IsUpsert = true };
            var result = await DataCollection().UpdateOneAsync(pst => pst.Username == dto.Username, definition, options);
            _logger.LogInformation($"User {dto.Username} was saved");

            return true;
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

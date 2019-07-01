using System.Linq;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
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
            var userQuery = await UserCollection().FindAsync(usr => !usr.IsDeleted && usr.Username == queryParam && usr.IsActive);
            var user = await userQuery.FirstOrDefaultAsync();
            return user?.BuildAuthDto();
        }

        public async Task<UserDto[]> GetAll()
        {
            var options = new FindOptions<User> { Sort = Builders<User>.Sort.Descending(x => x.Username) };
            var data = await UserCollection().FindAsync(pst => !pst.IsDeleted, options);
            return data.ToList().Select(pst => pst.BuildDto()).ToArray();
        }

        public Task<bool> Activate(string username)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> Deactivate(string username)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> Delete(string username)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> Save(UserDto dto)
        {
            throw new System.NotImplementedException();
        }

        private IMongoCollection<User> UserCollection() => Repository.GetCollection<User>(CollectionName);
    }
}

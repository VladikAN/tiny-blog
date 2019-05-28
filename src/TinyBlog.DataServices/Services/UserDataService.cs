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

        public async Task<UserDto> GetCredentials(string username)
        {
            var queryParam = username.Trim().ToLower();
            var userQuery = await UserCollection().FindAsync(usr => !usr.IsDeleted && usr.Username == queryParam && usr.IsActive);
            var user = await userQuery.FirstOrDefaultAsync();
            return user?.BuildDto();
        }

        private IMongoCollection<User> UserCollection() => Repository.GetCollection<User>(CollectionName);
    }
}

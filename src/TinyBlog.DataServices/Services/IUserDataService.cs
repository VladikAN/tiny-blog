using System.Threading.Tasks;
using TinyBlog.DataServices.Services.Dto;

namespace TinyBlog.DataServices.Services
{
    public interface IUserDataService
    {
        Task<AuthDto> GetCredentials(string username);
        Task<AuthDto> GetByRefresh(string refreshToken);
        Task<bool> Save(string username, string hash, string salt);

        Task<UserDto[]> GetAll();
        Task<UserDto> Get(string username);
        Task<bool> SetActivity(string username, bool isActive);
        Task<bool> Delete(string username);
        Task<bool> Save(UserDto dto, string hash = null, string salt = null);
        Task SetRefreshToken(string username, string token);
        Task PutFailedLogin(string username);
    }
}

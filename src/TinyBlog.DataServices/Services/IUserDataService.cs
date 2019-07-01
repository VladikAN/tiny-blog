using System.Threading.Tasks;
using TinyBlog.DataServices.Services.Dto;

namespace TinyBlog.DataServices.Services
{
    public interface IUserDataService
    {
        Task<AuthDto> GetCredentials(string username);
        Task<UserDto[]> GetAll();
        Task<bool> Activate(string username);
        Task<bool> Deactivate(string username);
        Task<bool> Delete(string username);
        Task<bool> Save(UserDto dto);
    }
}

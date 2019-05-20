using System.Threading.Tasks;
using TinyBlog.DataServices.Services.Dto;

namespace TinyBlog.DataServices.Services
{
    public interface IUserDataService
    {
        Task<UserDto> GetCredentials(string email);
    }
}

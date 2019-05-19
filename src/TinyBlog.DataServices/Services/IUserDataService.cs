using System.Threading.Tasks;
using TinyBlog.DataServices.Services.Dto;

namespace TinyBlog.DataServices.Services
{
    public interface IUserDataSerice
    {
        Task<UserDto> GetCredentials(string email);
    }
}

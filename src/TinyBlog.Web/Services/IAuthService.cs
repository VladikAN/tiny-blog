using System.Threading.Tasks;
using TinyBlog.Web.ViewModels;

namespace TinyBlog.Web.Services
{
    public interface IAuthService
    {
        Task<AuthResponseViewModel> TryAuthorize(string username, string password);
        Task<AuthResponseViewModel> RefreshJwt(string refreshToken);
        Task<bool> TryChangePassword(string username, string password, string token);
        Task<bool> SaveUser(UserViewModel model);
    }
}

using System.Threading.Tasks;
using TinyBlog.Web.ViewModels;

namespace TinyBlog.Web.Services
{
    public interface IAuthService
    {
        Task<UserViewModel> TryAuthorize(string email, string password);
    }
}

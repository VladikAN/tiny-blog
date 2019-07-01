using System.Threading.Tasks;
using TinyBlog.Web.ViewModels;

namespace TinyBlog.Web.Services
{
    public interface IAuthService
    {
        Task<AuthResponseViewModel> TryAuthorize(string username, string password);
    }
}

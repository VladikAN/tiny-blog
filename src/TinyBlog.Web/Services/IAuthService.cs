using System.Threading.Tasks;

namespace TinyBlog.Web.Services
{
    public interface IAuthService
    {
        Task<bool> TryAuthorize(string email, string password);
    }
}

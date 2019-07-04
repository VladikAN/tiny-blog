using System.Threading.Tasks;

namespace TinyBlog.Web.Services
{
    public interface IEmailService
    {
        Task NewUser(string username, string email, string password);
    }
}

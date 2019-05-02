using TinyBlog.DataServices.Services.Dto;
using System.Threading.Tasks;

namespace TinyBlog.DataServices.Services
{
    public interface IPostDataService
    {
        Task<PostDto[]> GetAll();
        Task<PostDto[]> GetByTag(string name);
        Task<PostDto> GetByLinkText(string linkText);
    }
}

using TinyBlog.DataServices.Services.Dto;
using System.Threading.Tasks;

namespace TinyBlog.DataServices.Services
{
    public interface IPostDataService
    {
        Task<PostDto[]> GetAll();
        Task<PostDto[]> GetByTag(string name);
        Task<PostDto> GetByLinkText(string linkText);

        Task<PostDto> Get(string id);
        Task<bool> Create(PostDto post);
        Task<bool> Update(PostDto post);
        Task<bool> TogglePublish(string id, bool publish);
    }
}

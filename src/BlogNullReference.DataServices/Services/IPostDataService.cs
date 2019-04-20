using BlogNullReference.DataServices.Services.Dto;
using System.Threading.Tasks;

namespace BlogNullReference.DataServices.Services
{
    public interface IPostDataService
    {
        Task<PostDto[]> GetAll();
        Task<PostDto[]> GetByTag(string name);
    }
}

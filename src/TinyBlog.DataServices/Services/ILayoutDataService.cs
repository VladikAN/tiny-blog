using System.Threading.Tasks;
using TinyBlog.DataServices.Services.Dto;

namespace TinyBlog.DataServices.Services
{
    public interface ILayoutDataService
    {
        Task<LayoutDto> Get();
        Task<bool> Save(LayoutDto layout);
    }
}
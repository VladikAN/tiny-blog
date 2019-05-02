using TinyBlog.DataServices.Services.Dto;
using Microsoft.AspNetCore.Mvc;

namespace TinyBlog.Web.ViewComponents
{
    public class Tags : ViewComponent
    {
        public IViewComponentResult Invoke(TagDto[] posts)
        {
            return View(posts);
        }
    }
}

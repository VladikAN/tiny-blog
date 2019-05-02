using TinyBlog.DataServices.Services.Dto;
using Microsoft.AspNetCore.Mvc;

namespace TinyBlog.Web.ViewComponents
{
    public class Posts : ViewComponent
    {
        public IViewComponentResult Invoke(PostDto[] posts)
        {
            return View(posts);
        }
    }
}

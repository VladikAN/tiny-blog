using Microsoft.AspNetCore.Mvc;
using TinyBlog.Web.ViewModels;

namespace TinyBlog.Web.ViewComponents
{
    public class Posts : ViewComponent
    {
        public IViewComponentResult Invoke(PostViewModel[] posts)
        {
            return View(posts);
        }
    }
}

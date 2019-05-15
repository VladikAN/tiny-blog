using Microsoft.AspNetCore.Mvc;
using TinyBlog.Web.ViewModels;

namespace TinyBlog.Web.ViewComponents
{
    public class Tags : ViewComponent
    {
        public IViewComponentResult Invoke(TagViewModel[] posts)
        {
            return View(posts);
        }
    }
}

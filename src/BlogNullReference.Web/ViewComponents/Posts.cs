using BlogNullReference.DataServices.Services.Dto;
using Microsoft.AspNetCore.Mvc;

namespace BlogNullReference.Web.ViewComponents
{
    public class Posts : ViewComponent
    {
        public IViewComponentResult Invoke(PostDto[] posts)
        {
            return View(posts);
        }
    }
}

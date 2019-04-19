using BlogNullReference.DataServices.Services.Dto;
using Microsoft.AspNetCore.Mvc;

namespace BlogNullReference.Web.ViewComponents
{
    public class Tags : ViewComponent
    {
        public IViewComponentResult Invoke(TagDto[] posts)
        {
            return View(posts);
        }
    }
}

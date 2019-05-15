using TinyBlog.DataServices.Services.Dto;

namespace TinyBlog.Web.ViewModels
{
    public class TagViewModel
    {
        public TagViewModel()
        {
        }

        public TagViewModel(TagDto tag)
        {
            Name = tag.Name;
        }

        public string Name { get; set; }
    }
}

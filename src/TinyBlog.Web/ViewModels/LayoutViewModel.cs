using TinyBlog.DataServices.Services.Dto;

namespace TinyBlog.Web.ViewModels
{
    public class LayoutViewModel
    {
        public LayoutViewModel()
        {
        }

        public LayoutViewModel(LayoutDto dto)
        {
            Title = dto.Language;
            Description = dto.Description;
            Uri = dto.Uri;
            Author = dto.Author;
            Language = dto.Language;
            GoogleTagsCode = dto.GoogleTagsCode;
            FooterContent = dto.FooterContent;
        }

        public string Title { get; set; }
        public string Description { get; set; }
        public string Uri { get; set; }
        public string Author { get; set; }
        public string Language { get; set; }
        public string GoogleTagsCode { get; set; }
        public string FooterContent { get; set; }

        public LayoutDto BuildDto()
        {
            return new LayoutDto(
                Title,
                Description,
                Uri,
                Author,
                Language,
                GoogleTagsCode,
                FooterContent);
        }
    }
}

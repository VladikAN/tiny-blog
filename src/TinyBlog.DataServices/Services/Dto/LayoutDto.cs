namespace TinyBlog.DataServices.Services.Dto
{
    public class LayoutDto
    {
        public LayoutDto()
        {
        }

        public LayoutDto(string title, string description, string uri, string author, string language, string googleTagsCode, string footerContent)
        {
            Title = title;
            Description = description;
            Uri = uri;
            Author = author;
            Language = language;
            GoogleTagsCode = googleTagsCode;
            FooterContent = footerContent;
        }

        public string Title { get; set; }
        public string Description { get; set; }
        public string Uri { get; set; }
        public string Author { get; set; }
        public string Language { get; set; }
        public string GoogleTagsCode { get; set; }
        public string FooterContent { get; set; }
    }
}

namespace TinyBlog.Web.Configuration.Settings
{
    public interface ISiteSettings
    {
        string Title { get; }
        string Description { get; }
        string Uri { get; }
        string Author { get; }
        string Language { get; }
        string GoogleTagsCode { get; }
        string FooterContent { get; }
        int DefaultCacheDuration { get; }
    }
}

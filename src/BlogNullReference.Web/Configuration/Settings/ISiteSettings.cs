namespace BlogNullReference.Web.Configuration.Settings
{
    public interface ISiteSettings
    {
        string Title { get; }
        string Description { get; }
        string Url { get; }
        string Author { get; }
        string GoogleTagsCode { get; }
    }
}

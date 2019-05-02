namespace TinyBlog.Web.Configuration.Settings
{
    public interface IApplicationInsightsSettings
    {
        bool Enabled { get; }
        string Key { get; }
    }
}

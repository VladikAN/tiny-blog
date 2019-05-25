namespace TinyBlog.Web.Configuration.Settings
{
    public interface IAuthSettings
    {
        string Issuer { get; }
        string Audience { get; }
        string Secret { get; }
    }
}

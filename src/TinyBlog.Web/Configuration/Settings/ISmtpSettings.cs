namespace TinyBlog.Web.Configuration.Settings
{
    public interface ISmtpSettings
    {
        bool Enabled { get; }
        bool UseSsl { get; }
        string Address { get; }
        int Port { get; }
        string Username { get; }
        string Password { get; }
        string FromEmail { get; }
    }
}
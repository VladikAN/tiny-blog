using Microsoft.Extensions.Configuration;

namespace TinyBlog.Web.Configuration.Settings
{
    public class SmtpSettings : ISmtpSettings
    {
        private const string SectionName = "Smtp";

        public SmtpSettings(IConfiguration configuration)
        {
            var section = configuration.GetSection(SectionName);
            Enabled = section.GetValue<bool>(nameof(Enabled));
            UseSsl = section.GetValue<bool>(nameof(UseSsl));
            Address = section.GetValue<string>(nameof(Address));
            Port = section.GetValue<int>(nameof(Port));
            Username = section.GetValue<string>(nameof(Username));
            Password = section.GetValue<string>(nameof(Password));
            FromEmail = section.GetValue<string>(nameof(FromEmail));
        }

        public bool Enabled { get; }
        public bool UseSsl { get; }
        public string Address { get; }
        public int Port { get; }
        public string Username { get; }
        public string Password { get; }
        public string FromEmail { get; }
    }
}
using MailKit.Net.Smtp;
using Microsoft.Extensions.Logging;
using MimeKit;
using System.Threading.Tasks;
using TinyBlog.DataServices.Services;
using TinyBlog.Web.Configuration.Settings;

namespace TinyBlog.Web.Services
{
    public class EmailService : IEmailService
    {
        private readonly ISmtpSettings _settings;
        private readonly ILayoutDataService _layoutDataService;
        private readonly ILogger _logger;

        public EmailService(
            ISmtpSettings settings,
            ILayoutDataService _layoutDataService,
            ILogger<EmailService> logger)
        {
            _settings = settings;
            _logger = logger;
        }

        public async Task NewUser(string username, string email, string password)
        {
            if (!_settings.Enabled)
            {
                _logger.LogWarning("Smtp client disabled. No messages will be sended");
                return;
            }

            var siteSettings = await _layoutDataService.Get();

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(_settings.FromEmail));
            message.To.Add(new MailboxAddress(email));
            message.Subject = "Welcome to administrators";

            message.Body = new TextPart("plain")
            {
                Text = $@"Hello,

You have granted access to {siteSettings.Uri} blog administrators.

Username: {username}
Password: {password}

Thanks."
            };

            await Send(message);
        }

        private async Task Send(MimeMessage message)
        {
            if (!_settings.Enabled)
            {
                _logger.LogWarning("Smtp client disabled. No messages will be sended");
                return;
            }

            using (var client = new SmtpClient())
            {
                client.Connect(_settings.Address, _settings.Port, _settings.UseSsl);
                if (!string.IsNullOrWhiteSpace(_settings.Username) && !string.IsNullOrWhiteSpace(_settings.Password))
                {
                    client.Authenticate(_settings.Username, _settings.Password);
                }

                await client.SendAsync(message);
                client.Disconnect(true);
            }
        }
    }
}

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
            ILayoutDataService layoutDataService,
            ILogger<EmailService> logger)
        {
            _settings = settings;
            _layoutDataService = layoutDataService;
            _logger = logger;
        }

        public async Task NewUser(string username, string email, string password)
        {
            var siteSettings = await _layoutDataService.Get();

            var message = new MimeMessage();
            message.From.Add(MailboxAddress.Parse(_settings.FromEmail));
            message.To.Add(MailboxAddress.Parse(email));
            message.Subject = $"Welcome to {siteSettings.Title}";

            message.Body = new TextPart("plain")
            {
                Text = $@"
Hello,

You have granted access to {siteSettings.Uri} blog administrators.

Username: {username}
Password: {password}

This is a temporary password. You will be prompted to enter a new one on first login.

Thanks."
            };

            await Send(message);
        }

        private async Task Send(MimeMessage message)
        {
            if (!_settings.Enabled)
            {
                _logger.LogWarning("Smtp client is disabled. No messages will be sent");
                return;
            }

            using (var client = new SmtpClient())
            {
                if (_settings.UseSsl)
                {
                    client.ServerCertificateValidationCallback = (s, c, h, e) => true;
                }
                
                await client.ConnectAsync(_settings.Address, _settings.Port, _settings.UseSsl);

                if (!string.IsNullOrWhiteSpace(_settings.Username) && !string.IsNullOrWhiteSpace(_settings.Password))
                {
                    await client.AuthenticateAsync(_settings.Username, _settings.Password);
                }

                await client.SendAsync(message);
                await client.DisconnectAsync(true);
            }
        }
    }
}
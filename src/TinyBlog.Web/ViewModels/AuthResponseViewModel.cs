using System;
using System.Text.Json.Serialization;

namespace TinyBlog.Web.ViewModels
{
    public class AuthResponseViewModel
    {
        public AuthResponseViewModel()
        {
        }

        public string Username { get; set; }
        public string Token { get; set; }
        public DateTime Expires { get; set; }

        [JsonIgnore]
        public string RefreshToken { get; set; }

        public string PasswordToken { get; set; }

        public static AuthResponseViewModel Authorized(string username, string token, string refreshToken, DateTime expires)
        {
            return new AuthResponseViewModel { Username = username, Token = token, RefreshToken = refreshToken, Expires = expires };
        }

        public static AuthResponseViewModel ChangePassword(string username, string passwordToken)
        {
            return new AuthResponseViewModel { Username = username, PasswordToken = passwordToken };
        }
    }
}
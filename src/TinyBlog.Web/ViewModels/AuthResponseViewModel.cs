namespace TinyBlog.Web.ViewModels
{
    public class AuthResponseViewModel
    {
        public AuthResponseViewModel()
        {
        }

        public string Username { get; set; }
        public string Token { get; set; }
        public string PasswordToken { get; set; }

        public static AuthResponseViewModel Authorized(string username, string token)
        {
            return new AuthResponseViewModel { Username = username, Token = token };
        }

        public static AuthResponseViewModel ChangePassword(string username, string passwordToken)
        {
            return new AuthResponseViewModel { Username = username, PasswordToken = passwordToken };
        }
    }
}
namespace TinyBlog.Web.ViewModels
{
    public class AuthResponseViewModel
    {
        public AuthResponseViewModel()
        {
        }

        public AuthResponseViewModel(string username, string token)
        {
            Username = username;
            Token = token;
        }

        public string Username { get; set; }
        public string Token { get; set; }
    }
}

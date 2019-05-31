namespace TinyBlog.Web.ViewModels
{
    public class UserViewModel
    {
        public UserViewModel()
        {
        }

        public UserViewModel(string username, string token)
        {
            Username = username;
            Token = token;
        }

        public string Username { get; set; }
        public string Token { get; set; }
    }
}

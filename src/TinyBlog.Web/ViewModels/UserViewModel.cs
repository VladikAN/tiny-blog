namespace TinyBlog.Web.ViewModels
{
    public class UserViewModel
    {
        public UserViewModel()
        {
        }

        public UserViewModel(string email, string token)
        {
            Email = email;
            Token = token;
        }

        public string Email { get; set; }
        public string Token { get; set; }
    }
}

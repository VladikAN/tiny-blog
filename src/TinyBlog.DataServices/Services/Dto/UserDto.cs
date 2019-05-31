namespace TinyBlog.DataServices.Services.Dto
{
    public class UserDto
    {
        public UserDto()
        {
        }

        public UserDto(string username, string email, string hash, string salt)
        {
            Username = username;
            Email = email;
            PasswordHash = hash;
            PasswordSalt = salt;
        }

        public string Username { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string PasswordSalt { get; set; }
    }
}

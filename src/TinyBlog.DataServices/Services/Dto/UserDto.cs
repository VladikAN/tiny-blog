namespace TinyBlog.DataServices.Services.Dto
{
    public class UserDto
    {
        public UserDto()
        {
        }

        public UserDto(string email, string hash, string salt)
        {
            Email = email;
            PasswordHash = hash;
            PasswordSalt = salt;
        }

        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string PasswordSalt { get; set; }
    }
}

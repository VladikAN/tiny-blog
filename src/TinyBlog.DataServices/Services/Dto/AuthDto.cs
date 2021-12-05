namespace TinyBlog.DataServices.Services.Dto
{
    public class AuthDto
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string PasswordSalt { get; set; }

        public SecurityTokenDto ChangePassword { get; set; }
        public SecurityTokenDto Refresh { get; set; }

        public bool IsLocked { get; set; }
    }
}

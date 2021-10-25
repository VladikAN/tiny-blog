namespace TinyBlog.DataServices.Services.Dto
{
    public class AuthDto
    {
        public AuthDto()
        {
        }

        public AuthDto(
            string username,
            string email,
            string hash,
            string salt,
            bool isChangePasswordRequired,
            string changePasswordToken,
            bool isLocked)
        {
            Username = username;
            Email = email;
            PasswordHash = hash;
            PasswordSalt = salt;

            ChangePasswordRequired = isChangePasswordRequired;
            ChangePasswordToken = changePasswordToken;

            IsLocked = isLocked;
        }

        public string Username { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string PasswordSalt { get; set; }

        public bool ChangePasswordRequired { get; set; }
        public string ChangePasswordToken { get; set; }

        public bool IsLocked { get; set; }
    }
}

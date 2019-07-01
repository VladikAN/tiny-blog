namespace TinyBlog.DataServices.Services.Dto
{
    public class UserDto
    {
        public UserDto()
        {
        }

        public UserDto(string username, string email, bool isActive)
        {
            Username = username;
            Email = email;
            IsActive = isActive;
        }
        
        public string Username { get; set; }
        public string Email { get; set; }
        public bool IsActive { get; set; }
    }
}
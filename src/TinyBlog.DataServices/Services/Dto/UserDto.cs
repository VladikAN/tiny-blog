namespace TinyBlog.DataServices.Services.Dto
{
    public class UserDto
    {
        public UserDto()
        {
        }

        public UserDto(string username, string email, bool isActive, bool isSuper, bool isLocked)
        {
            Username = username;
            Email = email;
            IsActive = isActive;
            IsSuper = isSuper;
            IsLocked = isLocked;
        }
        
        public string Username { get; set; }
        public string Email { get; set; }
        public bool IsActive { get; set; }
        public bool IsSuper { get; set; }
        public bool IsLocked { get; set; }
    }
}
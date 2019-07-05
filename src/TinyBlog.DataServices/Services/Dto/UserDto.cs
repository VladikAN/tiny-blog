namespace TinyBlog.DataServices.Services.Dto
{
    public class UserDto
    {
        public UserDto()
        {
        }

        public UserDto(string username, string email, bool isActive, bool isSuper)
        {
            Username = username;
            Email = email;
            IsActive = isActive;
            IsSuper = isSuper;
        }
        
        public string Username { get; set; }
        public string Email { get; set; }
        public bool IsActive { get; set; }
        public bool IsSuper { get; set; }
    }
}
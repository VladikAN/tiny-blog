using TinyBlog.DataServices.Services.Dto;

namespace TinyBlog.Web.ViewModels
{
    public class UserViewModel
    {
        public UserViewModel()
        {
        }

        public UserViewModel(UserDto dto)
        {
            Username = dto.Username;
            Email = dto.Email;
            IsActive = dto.IsActive;
            IsSuper = dto.IsSuper;
        }
        
        public string Username { get; set; }
        public string Email { get; set; }
        public bool IsActive { get; set; }
        public bool IsSuper { get; set; }

        public UserDto BuildDto()
        {
            return new UserDto
            {
                Username = Username.Trim().ToLower(),
                Email = Email.Trim().ToLower(),
                IsActive = IsActive
            };
        }
    }
}
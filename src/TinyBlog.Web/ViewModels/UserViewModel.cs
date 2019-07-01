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
        }
        
        public string Username { get; set; }
        public string Email { get; set; }
        public bool IsActive { get; set; }

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
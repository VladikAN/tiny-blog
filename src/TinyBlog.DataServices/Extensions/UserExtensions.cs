using TinyBlog.DataServices.Entities;
using TinyBlog.DataServices.Services.Dto;

namespace TinyBlog.DataServices.Extensions
{
    internal static class UserExtensions
    {
        internal static UserDto BuildDto(this User user)
        {
            return new UserDto(user.Username, user.Email, user.PasswordHash, user.PasswordSalt);
        }
    }
}

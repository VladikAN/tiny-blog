using TinyBlog.DataServices.Entities;
using TinyBlog.DataServices.Services.Dto;

namespace TinyBlog.DataServices.Extensions
{
    internal static class UserExtensions
    {
        internal static AuthDto BuildAuthDto(this User user)
        {
            var changePasswordRequired = user.ChangePassword != null;
            var changepasswordToken = user.ChangePassword?.Token ?? string.Empty;

            return new AuthDto(
                user.Username,
                user.Email,
                user.PasswordHash,
                user.PasswordSalt,
                changePasswordRequired,
                changepasswordToken);
        }

        internal static UserDto BuildDto(this User user)
        {
            return  new UserDto(user.Username, user.Email, user.IsActive, user.IsSuper);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
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
                changepasswordToken,
                user.RefreshToken,
                user.IsLocked());
        }

        internal static UserDto BuildDto(this User user)
        {
            return new UserDto(user.Username, user.Email, user.IsActive, user.IsSuper, user.IsLocked());
        }

        internal static bool IsLocked(this User user)
        {
            var failedLogins = new List<DateTime>(user.FailedLogins ?? new DateTime[0]);
            var offset = DateTime.UtcNow.AddMinutes(-5);
            return failedLogins.Count(fl => fl >= offset) >= 3;
        }
    }
}

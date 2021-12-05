using System;
using System.Collections.Generic;
using System.Linq;
using TinyBlog.DataServices.Entities;
using TinyBlog.DataServices.Services.Dto;
using TinyBlog.DataServices.Settings;

namespace TinyBlog.DataServices.Extensions
{
    internal static class UserExtensions
    {
        internal static AuthDto BuildAuthDto(this User user)
        {
            return new AuthDto
            {
                Username = user.Username,
                Email = user.Email,
                PasswordHash = user.PasswordHash,
                PasswordSalt = user.PasswordSalt,
                ChangePassword = user.ChangePassword != null 
                    ? new SecurityTokenDto(user.ChangePassword.Token, user.ChangePassword.Expires)
                    : null,
                Refresh = user.Refresh != null
                    ? new SecurityTokenDto(user.Refresh.Token, user.Refresh.Expires)
                    : null,
                IsLocked = user.IsLocked()
            };
        }

        internal static UserDto BuildDto(this User user)
        {
            return new UserDto(user.Username, user.Email, user.IsActive, user.IsSuper, user.IsLocked());
        }

        internal static bool IsLocked(this User user)
        {
            var failedLogins = new List<DateTime>(user.FailedLogins ?? new DateTime[0]);
            var offset = DateTime.UtcNow.AddMinutes(-5);
            return failedLogins.Count(fl => fl >= offset) >= AuthConsts.FailedLoginAttempts;
        }
    }
}

namespace TinyBlog.DataServices.Settings
{
    public static class AuthConsts
    {
        public const int ChangePasswordExpiration = 60 * 24;
        public const int JwtTokenExpiration = 5;
        public const int JwtRefreshTokenExpiration = 10;
        public const int FailedLoginAttempts = 3;
    }
}

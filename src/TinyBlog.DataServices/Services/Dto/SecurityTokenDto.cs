using System;

namespace TinyBlog.DataServices.Services.Dto
{
    public class SecurityTokenDto
    {
        public SecurityTokenDto(string token, DateTime expires)
        {
            Token = token;
            Expires = expires;
        }

        public string Token { get; }
        public DateTime Expires { get; }

        public bool IsExpired
        {
            get
            {
                return Expires <= DateTime.UtcNow;
            }
        }
    }
}

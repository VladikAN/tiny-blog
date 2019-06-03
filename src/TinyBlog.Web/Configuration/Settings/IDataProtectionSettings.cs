using System;

namespace TinyBlog.Web.Configuration.Settings
{
    public interface IDataProtectionSettings
    {
        bool Enabled { get; }
        Uri BlobUriWithSas { get; }
    }
}

﻿using Microsoft.Extensions.Configuration;

namespace TinyBlog.DataServices.Settings
{
    public class DatabaseSettings : IDatabaseSettings
    {
        public DatabaseSettings(IConfiguration configuration, string path = "blog")
        {
            ConnectionString = configuration.GetConnectionString(path);
        }

        public string ConnectionString { get; }
    }
}

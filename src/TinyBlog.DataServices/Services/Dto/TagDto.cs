﻿using TinyBlog.DataServices.Entities;

namespace TinyBlog.DataServices.Services.Dto
{
    public class TagDto
    {
        public TagDto(string name)
        {
            Name = name;
        }

        public string Name { get; }

        internal static TagDto Build(Tag tag)
        {
            return new TagDto(tag.Name);
        }
    }
}
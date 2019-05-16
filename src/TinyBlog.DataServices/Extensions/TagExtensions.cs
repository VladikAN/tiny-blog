using TinyBlog.DataServices.Entities;
using TinyBlog.DataServices.Services.Dto;

namespace TinyBlog.DataServices.Extensions
{
    internal static class TagExtensions
    {
        internal static TagDto BuildDto(this Tag tag)
        {
            return new TagDto(tag.Name);
        }

        internal static Tag BuildDomain(this TagDto tag)
        {
            return new Tag { Name = tag.Name };
        }
    }
}

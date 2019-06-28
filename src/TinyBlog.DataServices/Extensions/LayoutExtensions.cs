using TinyBlog.DataServices.Entities;
using TinyBlog.DataServices.Services.Dto;

namespace TinyBlog.DataServices.Extensions
{
    public static class LayoutExtensions
    {
        public static LayoutDto BuildDto(this Layout domain)
        {
            if (domain == null)
            {
                return null;
            }

            return new LayoutDto(
                domain.Title,
                domain.Description,
                domain.Uri,
                domain.Author,
                domain.Language,
                domain.GoogleTagsCode,
                domain.HeaderContent,
                domain.FooterContent);
        }

        public static Layout BuildDomain(this LayoutDto dto)
        {
            if (dto == null)
            {
                return null;
            }

            return new Layout
            {
                Title = dto.Title,
                Description = dto.Description,
                Uri = dto.Uri,
                Author = dto.Author,
                Language = dto.Language,
                GoogleTagsCode = dto.GoogleTagsCode,
                HeaderContent = dto.HeaderContent,
                FooterContent = dto.FooterContent
            };
        }
    }
}
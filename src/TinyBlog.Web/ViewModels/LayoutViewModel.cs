﻿using TinyBlog.DataServices.Services.Dto;

namespace TinyBlog.Web.ViewModels
{
    public class LayoutViewModel
    {
        public LayoutViewModel()
        {
        }

        public LayoutViewModel(LayoutDto dto)
        {
            if (dto == null)
            {
                Title = string.Empty;
                Description = string.Empty;
                Uri = string.Empty;
                Author = string.Empty;
                Language = string.Empty;
                GoogleTagsCode = string.Empty;
                HeaderContent = string.Empty;
                FooterContent = string.Empty;

                return;
            }

            Title = dto.Title;
            Description = dto.Description;
            Uri = dto.Uri;
            Author = dto.Author;
            Language = dto.Language;
            GoogleTagsCode = dto.GoogleTagsCode;
            HeaderContent = dto.HeaderContent;
            FooterContent = dto.FooterContent;
        }

        public string Title { get; set; }
        public string Description { get; set; }
        public string Uri { get; set; }
        public string Author { get; set; }
        public string Language { get; set; }
        public string GoogleTagsCode { get; set; }
        public string HeaderContent { get; set; }
        public string FooterContent { get; set; }

        public LayoutDto BuildDto()
        {
            return new LayoutDto(
                Title?.Trim() ?? string.Empty,
                Description?.Trim() ?? string.Empty,
                Uri?.Trim() ?? string.Empty,
                Author?.Trim() ?? string.Empty,
                Language?.Trim() ?? string.Empty,
                GoogleTagsCode?.Trim() ?? string.Empty,
                HeaderContent?.Trim() ?? string.Empty,
                FooterContent?.Trim() ?? string.Empty);
        }
    }
}

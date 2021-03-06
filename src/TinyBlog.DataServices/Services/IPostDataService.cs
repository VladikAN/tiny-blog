﻿using TinyBlog.DataServices.Services.Dto;
using System.Threading.Tasks;

namespace TinyBlog.DataServices.Services
{
    public interface IPostDataService
    {
        Task<PostDto[]> GetAll(bool publishedOnly = false);
        Task<PostDto[]> GetByTag(string name);
        Task<PostDto> GetByLinkText(string linkText);

        Task<PostDto> Get(string id);
        Task<string> Upsert(PostDto post);
        Task<bool> TogglePublish(string id, bool publish);
        Task<bool> Delete(string id);
    }
}

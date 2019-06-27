using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using System;
using System.Threading.Tasks;
using TinyBlog.DataServices.Entities;
using TinyBlog.DataServices.Extensions;
using TinyBlog.DataServices.Services.Dto;
using TinyBlog.DataServices.Settings;

namespace TinyBlog.DataServices.Services
{
    public class LayoutDataService : BaseDataService, ILayoutDataService
    {
        private const string CollectionName = "layout";

        private ILogger _logger;

        public LayoutDataService(
            IDatabaseSettings settings,
            ILogger<LayoutDataService> logger) : base(settings)
        {
            _logger = logger;
        }

        public async Task<LayoutDto> Get()
        {
            var data = await LayoutCollection().FindAsync(FilterDefinition<Layout>.Empty);
            var layout = await data.FirstOrDefaultAsync();
            return layout.BuildDto();
        }

        public async Task<bool> Save(LayoutDto layout)
        {
            try
            {
                var domain = layout.BuildDomain();
                var definition = Builders<Layout>.Update
                    .Set(x => x.Title, domain.Title)
                    .Set(x => x.Description, domain.Description)
                    .Set(x => x.Uri, domain.Uri)
                    .Set(x => x.Author, domain.Author)
                    .Set(x => x.Language, domain.Language)
                    .Set(x => x.GoogleTagsCode, domain.GoogleTagsCode)
                    .Set(x => x.FooterContent, domain.FooterContent);

                var options = new UpdateOptions { IsUpsert = true };
                var result = await LayoutCollection().UpdateOneAsync(FilterDefinition<Layout>.Empty, definition, options);
                _logger.LogInformation($"General layout settings was updated");

                return true;
            }
            catch (Exception e)
            {
                _logger.LogError(e, e.Message);
                return false;
            }
        }

        private IMongoCollection<Layout> LayoutCollection() => Repository.GetCollection<Layout>(CollectionName);
    }
}
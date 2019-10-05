using Microsoft.Extensions.Logging;
using MongoDB.Driver;
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

        private readonly ILogger _logger;

        public LayoutDataService(
            IDatabaseSettings settings,
            ILogger<LayoutDataService> logger) : base(settings)
        {
            _logger = logger;
        }

        public async Task<LayoutDto> Get()
        {
            var data = await DataCollection().FindAsync(FilterDefinition<Layout>.Empty);
            var layout = await data.FirstOrDefaultAsync();
            return layout.BuildDto();
        }

        public async Task<bool> Save(LayoutDto layout)
        {
            var domain = layout.BuildDomain();
            var definition = Builders<Layout>.Update
                .Set(x => x.Title, domain.Title)
                .Set(x => x.Description, domain.Description)
                .Set(x => x.Uri, domain.Uri)
                .Set(x => x.Author, domain.Author)
                .Set(x => x.Language, domain.Language)
                .Set(x => x.GoogleTagsCode, domain.GoogleTagsCode)
                .Set(x => x.HeaderContent, domain.HeaderContent)
                .Set(x => x.FooterContent, domain.FooterContent);

            var options = new UpdateOptions { IsUpsert = true };
            var result = await DataCollection().UpdateOneAsync(FilterDefinition<Layout>.Empty, definition, options);
            _logger.LogInformation($"Site settings were updated");

            return true;
        }

        private IMongoCollection<Layout> DataCollection() => Repository.GetCollection<Layout>(CollectionName);
    }
}
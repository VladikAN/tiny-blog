# Idea and Goals

The original idea is to implement basic blog engine on dotnet core. I'm using it for myself and going to support this further.

Everything is written with mantra 'keep it simple' in mind. All parts of code is expected to be simple and understandable for new developers.

## Known hosts

[NullReference.dev](https://nullreference.dev/)

## Tech Stack
### Backend

Backend part of the application is written on C# by using latest released dotnet core. Database communication is made by using official MongoDb driver.

Also supporting: [Azure Key Vault](https://azure.microsoft.com/en-in/services/key-vault/) and [Azure Application Insights](https://docs.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview).

### Frontend

Frontent part of the code is presented by:
* Regular user will see already rendered page. Implemented by using pure AspNet MVC Razor views. User gets basic html and css only without any javascript.
* Admin area is implemented by using typescript, react and redux.

### Configuration

Configuration is possible by using (from lowest priority): appsettings.json file, environment variables or Azure Key Vault.

# How to deploy

Please provide this value to start application:
* **ConnectionStrings/Blog** connection string to MongoDB database with read and write rights. Put database name to the same connection string.
* **Auth/Secret** put your own Base64 string for JWT token signature. At least 256 symbols long.
* **SiteSettings/Title** will be show on web page header and used inside of atom feed.

Optional settings under *SiteSettings* section can be left blank or default:
* **Description** is used to populate html meta tag for search engines and atom feed metadata.
* **Uri** is used to populate atom feed metadata. Tthis is your site address or domain.
* **Author** is used to populate atom feed metadata.
* **Language** is used to populate html meta tag for search engines.
* **GoogleTagsCode** special [GoogleTags](https://tagmanager.google.com/) code. You can used it for additional html meta tags management. Blank value means disabled.
* **FooterContent** this field supports markdown syntax and used to populate web page footer content.


# Development TODO list
## Move general site settings to admin area instead of configuration variables.

Such settings as: Author, Description, FooterContent and other can be moved to admin UI in order to simplify management.

#### Better markdown editor

Admin UI contains of markdown editor with live preview. This editor is not handy and needs to be changed to some other npm package or custom implementation. Most of the packages are heavy by size or required dependencies, so I've put basic implementation for now.
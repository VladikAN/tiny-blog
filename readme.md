# Idea and Goals

The original idea is to implement basic blog engine on dotnet core. I'm using it for myself and going to support this further.

Everything is written with mantra 'keep it simple' in mind. All parts of code is expected to be simple, understandable and serve as started guide for new developers.

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

### Docker

You can build and run entire application by simple docker-compose command:

```docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -D```

Command will build and run the application. Application will be available at [8080](http://localhost:8080/) port.

To access admin page use [/admin](http://localhost:8080/admin) path and *admin* / *admin* user credentials. Remember, this is DEV instance, avoid similar settings for PROD instance.

Stop application be this command line:

```docker-compose down```

### Configuration

Configuration is possible by using (from lowest priority): appsettings.json file, environment variables or Azure Key Vault.

# How to deploy

Please provide this value to start application:
* **ConnectionStrings/Blog** connection string to MongoDB database with read and write rights. Put database name to the same connection string.
* **Auth/Secret** put your own Base64 string for JWT token signature. At least 256 symbols long.

After application start you can login as admin by using /admin uri and specify general site settings:
* **SiteSettings/Title** will be show on web page header and used inside of atom feed.
* **Description** is used to populate html meta tag for search engines and atom feed metadata.
* **Uri** is used to populate atom feed metadata. Tthis is your site address or domain.
* **Author** is used to populate atom feed metadata.
* **Language** is used to populate html meta tag for search engines.
* **GoogleTagsCode** special [GoogleTags](https://tagmanager.google.com/) code. You can used it for additional html meta tags management. Blank value means disabled.
* **HeaderContent** this field supports markdown syntax and used to populate web page header section.
* **FooterContent** this field supports markdown syntax and used to populate web page footer section.

# Development TODO list

## Better markdown editor

Admin UI contains of markdown editor with live preview. This editor is not handy and needs to be changed to some other npm package or custom implementation. Most of the packages are heavy by size or required dependencies, so I've put basic implementation for now.

## Consider about unit tests

There is nothing really to unit test. Probably integration tests or end-to-end tests will give more benefit.
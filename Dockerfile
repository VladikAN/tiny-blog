# Build image definition
FROM mcr.microsoft.com/dotnet/core/sdk:3.0 AS builder

## install nodejs with npm
RUN curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh \
	&& bash nodesource_setup.sh \
	&& apt-get install -y nodejs

## restore & publish dotnet app
WORKDIR /src
COPY . .

RUN dotnet restore -v=m
RUN dotnet test -c=Release --no-restore
RUN dotnet publish \
    -c=Release \
    -o=$(pwd)/publish/web \
    -f=netcoreapp3.0 \
    --no-restore \
    src/TinyBlog.Web/TinyBlog.Web.csproj

# Runtime image definition
FROM mcr.microsoft.com/dotnet/core/aspnet:3.0
LABEL maintainer="https://github.com/vladikan/tiny-blog"

WORKDIR /app
COPY --from=builder /src/publish/web .

ENV ASPNETCORE_ENVIRONMENT="Production" \
    ASPNETCORE_URLS="http://+:80"
EXPOSE 80
HEALTHCHECK --interval=2m --timeout=10s --retries=5 CMD curl --fail http://localhost:80/health || exit 1

ENTRYPOINT ["dotnet", "TinyBlog.Web.dll"]

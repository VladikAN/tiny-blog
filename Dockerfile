#
# NET build container
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS netbuilder

WORKDIR /src
COPY . .

RUN dotnet restore -v=m
RUN dotnet test -c=Release --no-restore
RUN dotnet publish \
    -c=Release \
    -o=$(pwd)/publish/web \
    -f=net6.0 \
    --no-restore \
    src/TinyBlog.Web/TinyBlog.Web.csproj

#
# NODE build container
FROM node:14 as nodebuilder

WORKDIR /src
COPY src/TinyBlog.Web . 

RUN npm install
RUN npm run release

#
# Runtime image definition
FROM mcr.microsoft.com/dotnet/aspnet:6.0
LABEL maintainer="https://github.com/vladikan/tiny-blog"

WORKDIR /app
COPY --from=netbuilder /src/publish/web .
COPY --from=nodebuilder /src/wwwroot/ .

ENV ASPNETCORE_ENVIRONMENT="Production" \
    ASPNETCORE_URLS="http://+:80"
EXPOSE 80
HEALTHCHECK --interval=2m --timeout=10s --retries=5 CMD curl --fail -H "User-Agent: dockerfile-healthcheck" http://localhost:80/health || exit 1

ENTRYPOINT ["dotnet", "TinyBlog.Web.dll"]

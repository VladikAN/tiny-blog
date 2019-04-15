# Build
FROM mcr.microsoft.com/dotnet/core/sdk:2.2 AS builder
WORKDIR /src/
COPY . .
RUN dotnet restore -v=q
RUN dotnet publish \
    -c=Release \
    -o=publish/web \
    -f=netcoreapp2.2

# Runtime
FROM mcr.microsoft.com/dotnet/core/aspnet:2.2
MAINTAINER Vladislav Nekhaychik <vladislavnekhaichik@gmail.com>

WORKDIR /app/
COPY --from=builder /src/publish/web .

ENV ASPNETCORE_ENVIRONMENT="Production" \
    ASPNETCORE_URLS="http://+:80"
EXPOSE 80

ENTRYPOINT ["dotnet", "BlogNullReference.Web.dll"]
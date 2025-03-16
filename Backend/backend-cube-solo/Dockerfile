FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app


# Build-time arguments
ARG JWT_SECRET
ARG DATABASE_CONNECTION_STRING

# Pass ARG values as ENV so they persist
ENV JWT_SECRET=$JWT_SECRET
ENV DATABASE_CONNECTION_STRING=$DATABASE_CONNECTION_STRING


COPY *.csproj ./
RUN dotnet restore

COPY . ./
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

COPY --from=build /app/out ./

EXPOSE 7213

ENTRYPOINT ["dotnet", "backend-cube-solo.dll"]

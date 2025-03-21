# cesi-csharp-solo

## Installation

Ce projet utilise :

- **Next.js** (TypeScript)
- **ASP.NET Core** avec **Entity Framework Core**
- **Docker**

### 1. Prérequis

- [Git](https://git-scm.com/downloads)
- [Node](https://nodejs.org/fr)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [.NET SDK 8.0](https://dotnet.microsoft.com/fr-fr/download)

### 2. Installation

#### 2.1 Cloner le projet

```bash
git clone https://github.com/NoaGsl/cesi-csharp-solo
cd cesi-csharp-solo
```

#### 2.2 Ajouter les variables d'environnement

Dupliquez et renommez le fichier `.env.example` en `.env`. Complétez ensuite les variables d'environnement ci-dessous :

```
PGADMIN_DEFAULT_EMAIL=
PGADMIN_DEFAULT_PASSWORD=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=

# JWT CONFIG
JWT_SECRET=

# DATABASE CONFIG
DATABASE_CONNECTION_STRING=

API_URL="http://host.docker.internal:7213"

NEXT_PUBLIC_ADMIN_SEQUENCE=
```

#### 2.3 Démarrer l'application avec Docker

```bash
docker-compose up -d
```

### 3. Accéder à l'application

- Frontend : [http://localhost:3000](http://localhost:3000)

### 4. Accès à l'admin par défaut

Une fois sur le site, entrez la séquence administrateur que vous avez définie dans le fichier `.env`. Une fenêtre modale devrait s'ouvrir.  
À partir de là, vous pouvez vous enregistrer avec `super.admin@gmail.com` et votre mot de passe personnel.  
Une fois enregistré, vous pourrez vous connecter.

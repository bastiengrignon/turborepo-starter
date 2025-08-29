# Turborepo Starter kit
A ready to use template for a Turborepo monorepo.

# Apps
- `web`: a React app
- `api`: a Fastify app

## Front-end
- [Mantine](https://mantine.dev) for the UI
- [Vite](https://vitejs.dev) for the bundler
- [React Router](https://reactrouter.com) for routing
- [Better Auth](https://www.better-auth.com) for authentication
- [React icons](https://react-icons.github.io/react-icons) as icons library


## Back-end
- [Fastify](https://www.fastify.io) for the server
- [Better Auth](https://www.better-auth.com) for authentication
- [Prisma](https://www.prisma.io) for the Database


# Packages
- `typescript-config`: `tsconfig.json`s used throughout the monorepo


### Turborepo
- ```dev``` to run the apps
- ```build``` to build the apps
- ```check-types``` to check the types
- ```lint:fix``` to lint the code of all _apps_ using [BiomeJS](https://biomejs.dev/fr)

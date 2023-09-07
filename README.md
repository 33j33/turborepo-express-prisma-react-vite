# Turborepo based CRUD app

- uses node, express, prisma, react, vite

### Apps and Packages

- `api`: an [Express](https://expressjs.com/) server
- `web`: a [Vite](https://vitejs.dev/) single page app
- `scripts`: Jest and ESLint configurations
- `tsconfig`: tsconfig.json's used throughout the monorepo
- `types`: Zod Types


### Getting Started

- `npm install`

- #### Api Server

    - install postgresql
    - create database
    - cd `apps/api`
    - create .env and provide port and database url (`postgresql://USER:PASSWORD@HOST:PORT/DATABASE`)
    - `npm run db:generate`
    - `npm run db:migrate -- --name=MIGRATION_NAME`
    - import the postman collection to play with apis

- #### Client 
    - cd `apps/web`
    - create `.env` at the root using `.env.example` as reference


- `npm run dev` at the root project. This will run `turbo dev`

## What's inside?

This Turborepo includes the following packages and apps:

### Utilities

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Jest](https://jestjs.io) test runner for all things JavaScript
- [Prettier](https://prettier.io) for code formatting

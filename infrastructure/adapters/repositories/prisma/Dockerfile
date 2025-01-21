# Étape 1 : Construction de l'application
FROM node:22

WORKDIR /app

# On copie toutes les données mais on reste live avec le volume de docker compose
COPY ./infrastructure/adapters/repositories/prisma /app/infrastructure/adapters/repositories/prisma
COPY ./domain /app/domain
COPY ./application /app/application
COPY ./package.json /app/package.json
# COPY ./package-lock.json /app/package-lock.json
COPY ./tsconfig.json /app/tsconfig.json

# On initialise
RUN npm install

# On installe PostgreSQL pour pourvoir utiliser psql
RUN apt-get update && apt-get install -y postgresql-client

# Générer le client Prisma
RUN npm run generate -w @projet-clean/prisma

CMD npm run migrate -w @projet-clean/prisma && npm run dev -w @projet-clean/prisma

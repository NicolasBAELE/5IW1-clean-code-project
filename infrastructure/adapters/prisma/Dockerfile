# Étape 1 : Construction de l'application
FROM node:22

WORKDIR /app

# On copie toutes les données mais on reste live avec le volume de docker compose
COPY ./infrastructure/adapters/prisma /app/infrastructure/adapters/prisma
COPY ./domain /app/domain
COPY ./application /app/application
COPY package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
COPY tsconfig.json /app/tsconfig.json

# On initialise
RUN npm install

# Générer les migrations (Génère le client en même temps) et run le serveur en dev
CMD npm run generate -w @projet-clean/prisma && npm run dev -w @projet-clean/prisma

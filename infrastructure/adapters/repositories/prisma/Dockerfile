# Étape 1 : Construction de l'application
FROM node:18

WORKDIR /app/prisma

# On copie toutes les données mais on reste live avec le volume de docker compose
COPY ./ /app/prisma/

# On initialise
RUN npm install

# Générer le client Prisma
RUN npx prisma generate

# # Joue les migrations

CMD npx prisma migrate dev && npx prisma studio

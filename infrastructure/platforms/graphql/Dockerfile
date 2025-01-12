# Étape 1 : Construction de l'application
FROM node:18

WORKDIR /app/infrastructure/platforms/graphql/

# On copie toutes les données mais on reste live avec le volume de docker compose
COPY ./ /app/infrastructure/platforms/graphql/

# On initialise
RUN npm install

CMD npm run dev
FROM node:22

# WORKDIR /app/infrastructure/platforms/react/
WORKDIR /app

# On copie toutes les données mais on reste live avec le volume de docker compose
COPY ./infrastructure/platforms/react /app/infrastructure/platforms/react/

COPY ./domain /app/domain
COPY ./application /app/application
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

RUN npm install

CMD npm run dev -w @projet-clean/react
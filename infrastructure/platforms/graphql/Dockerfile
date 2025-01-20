FROM node:22

# WORKDIR /app/infrastructure/platforms/graphql/
WORKDIR /app

# On copie toutes les données mais on reste live avec le volume de docker compose
COPY ./infrastructure/platforms/graphql /app/infrastructure/platforms/graphql/

COPY ./domain /app/domain
COPY ./application /app/application
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
COPY ./tsconfig.json /app/tsconfig.json

RUN npm install

CMD npm run dev -w @projet-clean/graphql
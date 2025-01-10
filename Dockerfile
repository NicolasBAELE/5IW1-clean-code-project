# Étape 1 : Construction de l'application
FROM node:18 AS builder

WORKDIR /app

# Copier package.json et package-lock.json (si présents)
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code source, y compris le dossier prisma
COPY . .

# Générer le client Prisma
RUN npx prisma generate

# Construire l'application
RUN npm run build

# Étape 2 : Lancer l'application
FROM node:18

WORKDIR /app

# Copier les fichiers générés lors de la construction
COPY --from=builder /app/dist ./dist

# Copier uniquement les fichiers nécessaires à l'exécution de l'application
COPY package*.json ./

# Copier le dossier prisma nécessaire pour prisma client
COPY --from=builder /app/prisma /app/prisma

# Installer les dépendances de production (skip dev dependencies)
RUN npm install --only=production

# Exposer le port de l'application
EXPOSE 4000

# Lancer l'application
CMD ["npm", "run", "start"]

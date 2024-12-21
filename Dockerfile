# Utiliser l'image de base Node.js
FROM node:16

# Créer un répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code source dans le conteneur
COPY . .

# Créer le fichier CSS avec Tailwind
RUN npx tailwindcss -i ./src/styles/tailwind.css -o ./public/styles.css --minify

# Exposer le port 3000
EXPOSE 3000

# Commande pour démarrer l'application en mode développement avec nodemon
CMD ["npm", "run", "dev"]

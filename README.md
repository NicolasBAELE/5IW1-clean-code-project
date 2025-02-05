# CLEAN CODE PROJECT

**YVARS CLEMENT / BAELE NICOLAS / PARACHA JAN**

---

## **PRISMA :**
- Accéder au conteneur Prisma :
  ```bash
  docker compose exec -it prisma bash
- Exécuter la migration :
npm run migrate -w @projet-clean/prisma





Clean Code & Clean Architecture
Projet Pédagogique - 5ème année Ingénierie du Web
Introduction :
Triumph Motorcycles cherche à améliorer la gestion des motos utilisées par des entreprises partenaires (livreurs, coursiers, services de location, etc.) et par ses concessionnaires. Le projet consiste à développer une plateforme de gestion de flotte permettant à ces partenaires de suivre et d’optimiser l’utilisation des motos, tout en se concentrant sur :

La gestion des entretiens
Le suivi du cycle de vie des motos
D'autres aspects liés à la gestion efficace d'une flotte de véhicules.
Fonctionnalités (15 points) :
1. Gestion des entretiens préventifs et curatifs :
Planification des entretiens :
Définir des intervalles d’entretien en fonction du modèle de moto choisi par le client (ex. 10 000 km pour une Street Triple ou tous les ans, 16 000 km pour une Tiger Sport 660, etc.).
Rappels automatiques :
Notifications envoyées aux gestionnaires et aux clients lorsqu’un entretien est dû. Possibilité de renseigner manuellement le kilométrage par le client.
Suivi des entretiens réalisés :
Historique détaillé des entretiens effectués, incluant les pièces changées, les coûts associés, et les recommandations des techniciens, à la fois côté gestionnaire et client.
Gestion des pannes et garanties :
Enregistrement des pannes et garanties, gestion des réparations et suivi des actions correctives avec historisation.
2. Gestion des pièces détachées et des stocks :
Suivi des pièces détachées :
Gestion du stock de pièces détachées utilisées pour la maintenance (filtre à huile, pneus, freins, etc.).
Alerte de stock bas :
Notifications envoyées lorsqu’une pièce atteint un seuil critique de disponibilité.
Historique des commandes de pièces :
Suivi des commandes de pièces, coûts, délais de livraison, et quantité restante.
3. Suivi des essais :
Profil des conducteurs :
Gestion des conducteurs utilisant les motos, avec des informations sur leur permis, leur expérience et leur historique de conduite.
Essais moto :
Gestion des motos assignées à chaque conducteur avec suivi des dates et de la durée d’utilisation pour les essais moto.
Historique des incidents :
Enregistrement des incidents liés à chaque conducteur (accidents, infractions, etc.).
Contraintes techniques :
1. Langage :
Développement en TypeScript (backend et frontend).
2. Clean Architecture :
Séparation stricte des couches :
Domain (Entities)
Application (Use Cases)
Interface (API/Interface utilisateur)
Infrastructure (base de données, frameworks, etc.)
Chaque couche doit être indépendante des frameworks spécifiques pour faciliter la maintenance.
Proposer 2 adaptateurs :
Bases de données : in-memory, SQL, NoSQL
Frameworks backend : Nest.js, Express, Fastify
3. Clean Code :
Respect des principes de Clean Code vus en cours.
Pratiques supplémentaires issues de références telles que les ouvrages de Bob Martin.
Bonus :
1. CQRS :
Utiliser des commandes pour les requêtes.
Utiliser des queries pour les demandes.
Permet de préparer l’Event-Sourcing.
2. Event-Sourcing :
Utiliser l’Event-Sourcing pour permettre le retour dans le temps des événements passés.
L’utilisation de microservices est la bienvenue.
3. Framework Frontend :
Utilisation de plusieurs frameworks frontend.
Angular, React, et Solid.js à privilégier.
Lister les avantages et inconvénients de chacun.

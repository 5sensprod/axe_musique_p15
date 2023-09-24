![Custom DatePicker](https://img.shields.io/badge/Custom_DatePicker-1.1.0-brightgreen)
![Redux Toolkit](https://img.shields.io/badge/-Redux_Toolkit-764ABC?logo=redux&logoColor=white)
![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white)
![React Router](https://img.shields.io/badge/-React_Router-CA4245?logo=react-router&logoColor=white)
![React Datepicker](https://img.shields.io/badge/React_Datepicker-4.16.0-brightgreen)
![React Modal](https://img.shields.io/badge/React_Modal-3.16.1-brightgreen)
![React Redux](https://img.shields.io/badge/-React_Redux-764ABC?logo=redux&logoColor=white)
![React Select](https://img.shields.io/badge/React_Select-5.7.4-brightgreen)
![React Table](https://img.shields.io/badge/React_Table-7.8.0-brightgreen)
![Redux](https://img.shields.io/badge/-Redux-764ABC?logo=redux&logoColor=white)

# HRnet - WealthHealth 🚀

WealthHealth est une importante société financière utilisant une application interne, HRnet, pour gérer les dossiers de ses employés. L'objectif principal de ce projet est de moderniser HRnet en le convertissant entièrement en React, en remplaçant l'ancienne version qui utilisait principalement jQuery.

## Objectifs du Projet 🎯

- Convertir entièrement l'application HRnet en React.
- Remplacer les plugins jQuery par des composants React modernes.
- Introduire un système de gestion d'état.
- Effectuer des tests de performance et comparer l'ancienne et la nouvelle version.

## Remplacement des Plugins jQuery 🔄

Voici la liste des plugins jQuery originaux et leurs remplacements en React :

### Sélecteur de date :

- **Original** : Plugin jQuery de sélection de date
- **Remplacement** : **DatePicker personnalisé développé spécifiquement pour ce projet**. Vous pouvez le trouver sur [NPM](https://www.npmjs.com/package/@5sensprod/react-custom-datepicker).
  - Bibliothèque : `@5sensprod/react-custom-datepicker` (version v1.1.0)

### Fenêtre modale :

- **Original** : jQuery.modal.js
- **Remplacement** : [React Modal](https://reactcommunity.org/react-modal/)
  - Bibliothèque : `react-modal` v3.16.1

### Menus déroulants :

- **Original** : Plugin jQuery pour les menus déroulants
- **Remplacement** : [React Select](https://react-select.com/)
  - Bibliothèque : `react-select` v5.7.4

### Tables de données :

- **Original** : Plugin jQuery pour les tables de données
- **Remplacement** : [React Table](https://react-table.tanstack.com/)
  - Bibliothèque : `react-table` v7.8.0

## Prérequis 🚨

Pour faire fonctionner l'application HRnet, assurez-vous d'avoir les technologies suivantes installées :

- **Node.js** : version utilisée v16.17.0
- **Git**

## Installation et Lancement 🚀

1. **Clonage du dépôt :**

```bash
git clone --recurse-submodules https://github.com/5sensprod/p14_WealthHealt
cd p14_WealthHealth
npm install
```

2. **Lancement de l'application :**

```bash
npm start
```

Votre application devrait maintenant s'exécuter localement à l'adresse http://localhost:3000/

## Accès en Ligne 🌐

### Application

L'application est accessible en ligne à l'adresse :
[https://5sensprod.github.io/p14_WealthHealth](https://5sensprod.github.io/p14_WealthHealth)

### Documentation

La documentation du projet est consultable à l'adresse :
[https://5sensprod.github.io/p14_WealthHealth/docs](https://5sensprod.github.io/p14_WealthHealth/docs)

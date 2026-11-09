# Ma Liste de Tâches : projet de formation GitHub Copilot

Petite application web en HTML, CSS et JavaScript pur, sans framework.
C'est la base de travail de la formation : vous allez la lire, la compléter, la tester et la corriger avec GitHub Copilot.

## Structure

```
code/
├── index.html          Page principale
├── css/style.css       Styles
├── js/utils.js         Fonctions utilitaires pures (testables)
├── js/app.js           Logique de l'interface (ajout, filtre, suppression)
├── tests/utils.test.js Tests unitaires (Node.js natif)
├── package.json        Script npm test
└── README.md           Ce fichier
```

## Prérequis

- VS Code avec l'extension GitHub Copilot et GitHub Copilot Chat
- Node.js LTS (version 18 ou plus récente) pour lancer les tests
- Git (optionnel mais utilisé dans la formation)

## Lancer l'application

Option 1 : double-cliquer sur `index.html`.

Option 2 (recommandée) : installer l'extension **Live Server** dans VS Code, puis clic droit sur `index.html` → **Open with Live Server**.

## Lancer les tests

Depuis le dossier `code/` :

```bash
npm test
```

Par défaut, **2 tests échouent** : c'est volontaire. Ce sont des bugs à trouver et corriger avec Copilot pendant la formation (voir l'énoncé, modules 3 et 6).

## Bugs volontaires (à découvrir)

Indice : ne lisez pas la solution directement, demandez à Copilot de vous expliquer le code et les tests qui échouent.

- `Utils.isValidTitle` accepte un titre composé uniquement d'espaces.
- `Utils.countDone` ignore la première tâche de la liste.

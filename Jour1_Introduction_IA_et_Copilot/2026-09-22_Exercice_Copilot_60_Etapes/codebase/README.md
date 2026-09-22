# TaskBoard — codebase d'exercice (HTML / CSS / JS)

Petite application de gestion de tâches, en **HTML, CSS et JavaScript**, construite pour l'exercice pratique **« 60 étapes GitHub Copilot »**. Le JS est volontairement incomplet (un bug, plusieurs `TODO`) : c'est la matière première des étapes intermédiaires et expert de l'exercice.

## Lancer le site

Ouvrez simplement [`index.html`](index.html) dans un navigateur (double-clic, ou glisser-déposer). Aucune installation, aucun serveur requis.

## Fichiers du projet

```
index.html                      Page principale : formulaire + tableau à 3 colonnes
task-detail.html                 Détail d'une tâche
about.html                       Présentation du projet
css/variables.css                Couleurs, espacements, arrondis (variables CSS)
css/base.css                     Remise à zéro et styles de base
css/layout.css                   Structure des pages
css/components.css               Cartes, badges, boutons, formulaire (contient un TODO)
css/responsive.css                Adaptation aux petits écrans
css/legacy-styles.css             Ancien fichier de styles, volontairement mal écrit (cible de refactor)
js/app.js                         Logique JS : formatage de date (BUG volontaire), création de carte (TODO), persistance (TODO)
docs/architecture.md              Documentation d'architecture existante
docs/checklist-accessibilite.md   Points à vérifier avant de livrer une page
```

Aucune donnée réelle n'est utilisée : tout le contenu est fictif.

Voir le guide **[../participant.html](../participant.html)** (feuille à remplir) et **[../formateur.html](../formateur.html)** (corrigé) pour l'exercice pas à pas en 60 étapes.

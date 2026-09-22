# Architecture TaskBoard (document existant, fictif)

TaskBoard est un site **HTML/CSS/JS sans étape de build** : ouvrez simplement `index.html` dans un navigateur. Le JS (`js/app.js`) est volontairement incomplet, voir plus bas.

## Pages

1. `index.html` — le tableau des tâches (3 colonnes) et le formulaire de création (statique)
2. `task-detail.html` — le détail d'une tâche
3. `about.html` — présentation du projet

## Feuilles de styles

Chargées dans cet ordre sur chaque page :

1. `css/variables.css` — les couleurs, espacements et arrondis, sous forme de variables CSS (`--color-accent`, `--space-md`...)
2. `css/base.css` — la remise à zéro (reset) et les styles de base (police, liens, focus clavier)
3. `css/layout.css` — la structure des pages (en-tête, grille du tableau, pied de page)
4. `css/components.css` — les éléments réutilisables (cartes, badges, boutons, formulaire)
5. `css/responsive.css` — l'adaptation aux petits écrans
6. `css/legacy-styles.css` — **ancien fichier, à améliorer** (voir le guide d'exercice, niveau Intermédiaire) : il stylise d'anciens badges de priorité, remplacés depuis par `.badge` dans `components.css`, mais encore présents dans le projet.

## Script

`js/app.js` contient : `formatDate()` (bug volontaire de mois décalé), `libellePriorite()`, `creerCarteTache()` (pas encore branchée au formulaire) et des `TODO` pour la persistance `localStorage`. Voir le guide d'exercice pour l'ordre dans lequel les traiter.

## Ce qui est fictif

Aucune donnée réelle. Les tâches affichées dans le HTML sont écrites en dur ; il n'y a pas de base de données.

## Accessibilité

Voir `docs/checklist-accessibilite.md` pour les points à vérifier avant de considérer une page terminée.

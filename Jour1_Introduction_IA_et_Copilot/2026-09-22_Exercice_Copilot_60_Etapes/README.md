# Atelier GitHub Copilot — 60 étapes, de A à Z (22 septembre 2026)

Exercice pratique complet, en une seule session d'environ **4h** (≈4h15 avec pauses), sur une codebase **HTML / CSS / JS**. Va de l'installation de Copilot jusqu'à la création d'agents personnalisés, de sous-agents, de skills, de serveurs MCP et de workflows agentiques.

## Contenu du dossier

```
codebase/          Codebase d'exercice TaskBoard (HTML/CSS/JS, volontairement incomplète)
participant.html   Feuille à remplir par chaque participant (60 étapes, champs vides)
formateur.html      Corrigé formateur (60 étapes, réponses de référence + repères de facilitation)
README.md           Ce fichier
```

## Déroulé (3 niveaux, 60 étapes)

| Niveau | Étapes | Durée indicative | Thèmes |
|---|---|---|---|
| 🟢 Débutant | 1–20 | ~42 min | Installation, interface, suggestions inline, Copilot Chat, variables `#`, commandes slash, prompt engineering de base |
| 🟡 Intermédiaire | 21–40 | ~91 min | Edit/Agent mode multi-fichiers, nettoyage du code existant, `copilot-instructions.md`, `*.instructions.md`, prompt files, `AGENTS.md`, choix de modèle, qualité, sécurité |
| 🔴 Expert | 41–60 | ~112 min | Cloud agent, agents personnalisés, sous-agents (handoffs), Skills, MCP, plugins, hooks, workflows agentiques, prompt engineering avancé, gouvernance, Copilot CLI, capstone |

Ajoutez ~35 min de pauses/accueil/bilan → prévoir un créneau de **4h à 4h30**.

## Comment l'utiliser

1. Chaque participant ouvre `codebase/index.html` dans un navigateur et le dossier `codebase/` dans son éditeur (VS Code + extension GitHub Copilot).
2. Chaque participant ouvre `participant.html` dans son navigateur et le remplit au fil des 60 étapes.
3. En fin de session, chaque participant clique sur **« Exporter en PDF »** (bouton en haut à droite de `participant.html`) et remet sa copie.
4. Le formateur s'appuie sur `formateur.html` (réponses de référence en vert + repères de facilitation en jaune 🎯) pour corriger et pour animer chaque étape en direct.

Aucune donnée réelle n'est utilisée : la codebase `codebase/` est entièrement fictive.

## Différence avec les anciennes versions de l'atelier

Les versions précédentes de l'atelier (10 étapes, 50 actions, HTML/CSS sans JavaScript) ont été archivées dans [`../archive/`](../archive/) — celle-ci les remplace avec une portée plus large (60 étapes, JS inclus, agents/skills/MCP jusqu'au bout).

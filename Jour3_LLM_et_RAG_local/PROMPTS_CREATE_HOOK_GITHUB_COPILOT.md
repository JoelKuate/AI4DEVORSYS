# 17 prompts prêts à copier pour `/create-hook` (GitHub Copilot)

**Date : 11 novembre 2026.** Mode d'emploi : dans VS Code avec **session Local**, copier un bloc entier dans le chat. Pour une session **Copilot** ou Copilot CLI, retirer `/create-hook` et transmettre la description à l'agent ; dans VS Code Copilot, `/hooks` permet aussi de gérer la création des hooks. Le guide exhaustif des événements et permissions est dans `GUIDE_CREATION_HOOKS_GITHUB_COPILOT.md`.

Source officielle : https://code.visualstudio.com/docs/agent-customization/hooks et https://docs.github.com/en/copilot/reference/hooks-reference

**Règle commune :** chaque prompt requiert une configuration `.github/hooks/*.json`, un script et des tests ; il s'agit de propositions à générer et non de hooks déjà actifs.

## 01 — Garde-fou commandes dangereuses

- **Événement :** `preToolUse`
- **Déclencheur / filtre :** matcher `bash|powershell`
- **Situations :** Commande shell normale autorisée ; suppression destructive refusée ; commande ambiguë traitée sans exécution.

```text
/create-hook Crée « Garde-fou commandes dangereuses » avec l’événement `preToolUse` (matcher `bash|powershell`). Refuser `git push --force`, `rm -rf`, `git reset --hard` ciblant des données utiles et commandes destructives non explicitement approuvées ; ne pas bloquer les commandes sûres. Scénarios d’acceptation : Commande shell normale autorisée ; suppression destructive refusée ; commande ambiguë traitée sans exécution. Analyse le dépôt, identifie la stack et l’hôte (VS Code Local/Copilot CLI/cloud). Crée un hook JSON version 1 dans `.github/hooks/`, un script robuste et des tests locaux avec charges utiles JSON simulées. Respecte le schéma officiel de cet événement et la sémantique des sorties. Filtre les outils concernés, évite les dépendances non autorisées, n’exécute jamais directement les arguments reçus, masque les secrets, documente la compatibilité Windows/Linux et n’annonce aucun test non exécuté. Préserve les hooks existants.
```

## 02 — Contrôle des secrets avant édition

- **Événement :** `preToolUse`
- **Déclencheur / filtre :** matcher `create|edit|bash|powershell`
- **Situations :** Modification sans secret autorisée ; chaîne de test de secret synthétique refusée ; faux positif non sensible.

```text
/create-hook Crée « Contrôle des secrets avant édition » avec l’événement `preToolUse` (matcher `create|edit|bash|powershell`). Détecter dans les arguments structurés les secrets à risque avant écriture ; empêcher uniquement l’écriture risquée ; masquer la valeur dans le motif de refus. Ne pas promettre une prévention universelle. Scénarios d’acceptation : Modification sans secret autorisée ; chaîne de test de secret synthétique refusée ; faux positif non sensible. Analyse le dépôt, identifie la stack et l’hôte (VS Code Local/Copilot CLI/cloud). Crée un hook JSON version 1 dans `.github/hooks/`, un script robuste et des tests locaux avec charges utiles JSON simulées. Respecte le schéma officiel de cet événement et la sémantique des sorties. Filtre les outils concernés, évite les dépendances non autorisées, n’exécute jamais directement les arguments reçus, masque les secrets, documente la compatibilité Windows/Linux et n’annonce aucun test non exécuté. Préserve les hooks existants.
```

## 03 — Formatage incrémental

- **Événement :** `postToolUse`
- **Déclencheur / filtre :** matcher `create|edit`
- **Situations :** Fichier JS formaté ; README ignoré ; outil absent signalé sans installation.

```text
/create-hook Crée « Formatage incrémental » avec l’événement `postToolUse` (matcher `create|edit`). Après édition réussie, identifier précisément les fichiers de code concernés, exécuter uniquement le formateur installé (Prettier/Black/etc.) et fournir un retour à l’agent ; éviter toute récursion. Scénarios d’acceptation : Fichier JS formaté ; README ignoré ; outil absent signalé sans installation. Analyse le dépôt, identifie la stack et l’hôte (VS Code Local/Copilot CLI/cloud). Crée un hook JSON version 1 dans `.github/hooks/`, un script robuste et des tests locaux avec charges utiles JSON simulées. Respecte le schéma officiel de cet événement et la sémantique des sorties. Filtre les outils concernés, évite les dépendances non autorisées, n’exécute jamais directement les arguments reçus, masque les secrets, documente la compatibilité Windows/Linux et n’annonce aucun test non exécuté. Préserve les hooks existants.
```

## 04 — Tests ciblés après changement

- **Événement :** `postToolUse`
- **Déclencheur / filtre :** matcher `create|edit|bash`
- **Situations :** Test unitaire réussi ; test en échec remonté ; modification de documentation ignorée.

```text
/create-hook Crée « Tests ciblés après changement » avec l’événement `postToolUse` (matcher `create|edit|bash`). Sélectionner des tests liés aux fichiers changés selon les conventions détectées ; limiter coût et fréquence ; ne pas relancer sur chaque lecture. Scénarios d’acceptation : Test unitaire réussi ; test en échec remonté ; modification de documentation ignorée. Analyse le dépôt, identifie la stack et l’hôte (VS Code Local/Copilot CLI/cloud). Crée un hook JSON version 1 dans `.github/hooks/`, un script robuste et des tests locaux avec charges utiles JSON simulées. Respecte le schéma officiel de cet événement et la sémantique des sorties. Filtre les outils concernés, évite les dépendances non autorisées, n’exécute jamais directement les arguments reçus, masque les secrets, documente la compatibilité Windows/Linux et n’annonce aucun test non exécuté. Préserve les hooks existants.
```

## 05 — Audit de dépendances

- **Événement :** `postToolUse`
- **Déclencheur / filtre :** matcher `create|edit`
- **Situations :** package-lock modifié → audit ; autre fichier ignoré ; audit indisponible documenté.

```text
/create-hook Crée « Audit de dépendances » avec l’événement `postToolUse` (matcher `create|edit`). Après changement d’un manifeste ou lockfile, lancer audit local approprié si présent, sans installation ni appel réseau imprévu ; rapporter gravité. Scénarios d’acceptation : package-lock modifié → audit ; autre fichier ignoré ; audit indisponible documenté. Analyse le dépôt, identifie la stack et l’hôte (VS Code Local/Copilot CLI/cloud). Crée un hook JSON version 1 dans `.github/hooks/`, un script robuste et des tests locaux avec charges utiles JSON simulées. Respecte le schéma officiel de cet événement et la sémantique des sorties. Filtre les outils concernés, évite les dépendances non autorisées, n’exécute jamais directement les arguments reçus, masque les secrets, documente la compatibilité Windows/Linux et n’annonce aucun test non exécuté. Préserve les hooks existants.
```

## 06 — Quality gate avant fin de tour

- **Événement :** `agentStop`
- **Déclencheur / filtre :** sans matcher
- **Situations :** Tous contrôles verts → allow ; échec réel → block une fois ; réentrée → sortie maîtrisée.

```text
/create-hook Crée « Quality gate avant fin de tour » avec l’événement `agentStop` (sans matcher). Avant de permettre la fin, analyser lint, tests, compilation avec budget et indicateur anti-boucle ; `block` uniquement si remédiable et avec raison actionnable. Scénarios d’acceptation : Tous contrôles verts → allow ; échec réel → block une fois ; réentrée → sortie maîtrisée. Analyse le dépôt, identifie la stack et l’hôte (VS Code Local/Copilot CLI/cloud). Crée un hook JSON version 1 dans `.github/hooks/`, un script robuste et des tests locaux avec charges utiles JSON simulées. Respecte le schéma officiel de cet événement et la sémantique des sorties. Filtre les outils concernés, évite les dépendances non autorisées, n’exécute jamais directement les arguments reçus, masque les secrets, documente la compatibilité Windows/Linux et n’annonce aucun test non exécuté. Préserve les hooks existants.
```

## 07 — Vérification sous-agent QA

- **Événement :** `subagentStop`
- **Déclencheur / filtre :** sans matcher
- **Situations :** Livrable complet accepté ; résultat sans tests signalé ; maximum de tentatives.

```text
/create-hook Crée « Vérification sous-agent QA » avec l’événement `subagentStop` (sans matcher). À la fin d’un sous-agent QA, vérifier présence de résultats de tests et de points bloquants ; demander continuation si sortie insuffisante, sans boucle infinie. Scénarios d’acceptation : Livrable complet accepté ; résultat sans tests signalé ; maximum de tentatives. Analyse le dépôt, identifie la stack et l’hôte (VS Code Local/Copilot CLI/cloud). Crée un hook JSON version 1 dans `.github/hooks/`, un script robuste et des tests locaux avec charges utiles JSON simulées. Respecte le schéma officiel de cet événement et la sémantique des sorties. Filtre les outils concernés, évite les dépendances non autorisées, n’exécute jamais directement les arguments reçus, masque les secrets, documente la compatibilité Windows/Linux et n’annonce aucun test non exécuté. Préserve les hooks existants.
```

## 08 — Contexte projet au démarrage

- **Événement :** `sessionStart`
- **Déclencheur / filtre :** sans matcher
- **Situations :** Nouvelle session reçoit le contexte ; dépôt incomplet → message neutre.

```text
/create-hook Crée « Contexte projet au démarrage » avec l’événement `sessionStart` (sans matcher). Lire conventions sûres du dépôt et injecter synthèse de commandes test/architecture via `additionalContext`, sans divulgation d’informations confidentielles. Scénarios d’acceptation : Nouvelle session reçoit le contexte ; dépôt incomplet → message neutre. Analyse le dépôt, identifie la stack et l’hôte (VS Code Local/Copilot CLI/cloud). Crée un hook JSON version 1 dans `.github/hooks/`, un script robuste et des tests locaux avec charges utiles JSON simulées. Respecte le schéma officiel de cet événement et la sémantique des sorties. Filtre les outils concernés, évite les dépendances non autorisées, n’exécute jamais directement les arguments reçus, masque les secrets, documente la compatibilité Windows/Linux et n’annonce aucun test non exécuté. Préserve les hooks existants.
```

## 09 — Journal de session et nettoyage

- **Événement :** `sessionEnd`
- **Déclencheur / filtre :** sans matcher
- **Situations :** Fin normale ; erreur ; nettoyage limité aux chemins réservés.

```text
/create-hook Crée « Journal de session et nettoyage » avec l’événement `sessionEnd` (sans matcher). Enregistrer métadonnées minimales, durée, statut et nettoyer uniquement fichiers temporaires créés par le hook ; pas de contenu intégral des prompts. Scénarios d’acceptation : Fin normale ; erreur ; nettoyage limité aux chemins réservés. Analyse le dépôt, identifie la stack et l’hôte (VS Code Local/Copilot CLI/cloud). Crée un hook JSON version 1 dans `.github/hooks/`, un script robuste et des tests locaux avec charges utiles JSON simulées. Respecte le schéma officiel de cet événement et la sémantique des sorties. Filtre les outils concernés, évite les dépendances non autorisées, n’exécute jamais directement les arguments reçus, masque les secrets, documente la compatibilité Windows/Linux et n’annonce aucun test non exécuté. Préserve les hooks existants.
```

## 10 — Échec d’outil : diagnostics utiles

- **Événement :** `postToolUseFailure`
- **Déclencheur / filtre :** matcher `bash|powershell`
- **Situations :** Commande inexistante ; test échoué ; message non sensible.

```text
/create-hook Crée « Échec d’outil : diagnostics utiles » avec l’événement `postToolUseFailure` (matcher `bash|powershell`). Reconnaître un échec de commande de test/build, fournir à l’agent des conseils de diagnostic via mécanisme documenté ; ne pas modifier l’échec ni forcer un succès. Scénarios d’acceptation : Commande inexistante ; test échoué ; message non sensible. Analyse le dépôt, identifie la stack et l’hôte (VS Code Local/Copilot CLI/cloud). Crée un hook JSON version 1 dans `.github/hooks/`, un script robuste et des tests locaux avec charges utiles JSON simulées. Respecte le schéma officiel de cet événement et la sémantique des sorties. Filtre les outils concernés, évite les dépendances non autorisées, n’exécute jamais directement les arguments reçus, masque les secrets, documente la compatibilité Windows/Linux et n’annonce aucun test non exécuté. Préserve les hooks existants.
```

## 11 — Permission de publication CLI

- **Événement :** `permissionRequest`
- **Déclencheur / filtre :** matcher `bash|powershell`
- **Situations :** Push protégé refusé ; lecture autorisée par système ; bypass non préapprouvé.

```text
/create-hook Crée « Permission de publication CLI » avec l’événement `permissionRequest` (matcher `bash|powershell`). En CLI uniquement, refuser `git push` vers branches protégées suivant politique locale, laisser les cas non gérés au système d’autorisations ; gérer `requestSandboxBypass`. Scénarios d’acceptation : Push protégé refusé ; lecture autorisée par système ; bypass non préapprouvé. Analyse le dépôt, identifie la stack et l’hôte (VS Code Local/Copilot CLI/cloud). Crée un hook JSON version 1 dans `.github/hooks/`, un script robuste et des tests locaux avec charges utiles JSON simulées. Respecte le schéma officiel de cet événement et la sémantique des sorties. Filtre les outils concernés, évite les dépendances non autorisées, n’exécute jamais directement les arguments reçus, masque les secrets, documente la compatibilité Windows/Linux et n’annonce aucun test non exécuté. Préserve les hooks existants.
```

## 12 — Trace du prompt utilisateur

- **Événement :** `userPromptSubmitted`
- **Déclencheur / filtre :** sans matcher
- **Situations :** Audit minimal créé ; aucune fuite de prompt.

```text
/create-hook Crée « Trace du prompt utilisateur » avec l’événement `userPromptSubmitted` (sans matcher). Noter l’horodatage et taille approximative du prompt, sans conserver le texte ; aucune prétention à le modifier via hook fichier. Scénarios d’acceptation : Audit minimal créé ; aucune fuite de prompt. Analyse le dépôt, identifie la stack et l’hôte (VS Code Local/Copilot CLI/cloud). Crée un hook JSON version 1 dans `.github/hooks/`, un script robuste et des tests locaux avec charges utiles JSON simulées. Respecte le schéma officiel de cet événement et la sémantique des sorties. Filtre les outils concernés, évite les dépendances non autorisées, n’exécute jamais directement les arguments reçus, masque les secrets, documente la compatibilité Windows/Linux et n’annonce aucun test non exécuté. Préserve les hooks existants.
```

## 13 — Sauvegarde avant compactage

- **Événement :** `preCompact`
- **Déclencheur / filtre :** matcher `auto|manual`
- **Situations :** Compactage auto ; manuel ; données sensibles exclues.

```text
/create-hook Crée « Sauvegarde avant compactage » avec l’événement `preCompact` (matcher `auto|manual`). Produire un résumé local factuel d’état de tâche non sensible, sans supposer une injection automatique dans le prochain contexte. Scénarios d’acceptation : Compactage auto ; manuel ; données sensibles exclues. Analyse le dépôt, identifie la stack et l’hôte (VS Code Local/Copilot CLI/cloud). Crée un hook JSON version 1 dans `.github/hooks/`, un script robuste et des tests locaux avec charges utiles JSON simulées. Respecte le schéma officiel de cet événement et la sémantique des sorties. Filtre les outils concernés, évite les dépendances non autorisées, n’exécute jamais directement les arguments reçus, masque les secrets, documente la compatibilité Windows/Linux et n’annonce aucun test non exécuté. Préserve les hooks existants.
```

## 14 — Politique de sous-agent

- **Événement :** `subagentStart`
- **Déclencheur / filtre :** matcher sur `agentName`
- **Situations :** Sous-agent QA ciblé reçoit consignes ; autres non modifiés.

```text
/create-hook Crée « Politique de sous-agent » avec l’événement `subagentStart` (matcher sur `agentName`). Injecter des critères de revue de code au sous-agent ciblé ; ne pas prétendre bloquer son démarrage. Scénarios d’acceptation : Sous-agent QA ciblé reçoit consignes ; autres non modifiés. Analyse le dépôt, identifie la stack et l’hôte (VS Code Local/Copilot CLI/cloud). Crée un hook JSON version 1 dans `.github/hooks/`, un script robuste et des tests locaux avec charges utiles JSON simulées. Respecte le schéma officiel de cet événement et la sémantique des sorties. Filtre les outils concernés, évite les dépendances non autorisées, n’exécute jamais directement les arguments reçus, masque les secrets, documente la compatibilité Windows/Linux et n’annonce aucun test non exécuté. Préserve les hooks existants.
```

## 15 — Observer erreur agent

- **Événement :** `errorOccurred`
- **Déclencheur / filtre :** sans matcher
- **Situations :** Erreur simulée enregistrée ; jetons absents du log.

```text
/create-hook Crée « Observer erreur agent » avec l’événement `errorOccurred` (sans matcher). Enregistrer type d’erreur et indicateur d’échec dans un log local masqué ; aucune tentative de bloquer par sortie. Scénarios d’acceptation : Erreur simulée enregistrée ; jetons absents du log. Analyse le dépôt, identifie la stack et l’hôte (VS Code Local/Copilot CLI/cloud). Crée un hook JSON version 1 dans `.github/hooks/`, un script robuste et des tests locaux avec charges utiles JSON simulées. Respecte le schéma officiel de cet événement et la sémantique des sorties. Filtre les outils concernés, évite les dépendances non autorisées, n’exécute jamais directement les arguments reçus, masque les secrets, documente la compatibilité Windows/Linux et n’annonce aucun test non exécuté. Préserve les hooks existants.
```

## 16 — Signal d’inactivité CLI

- **Événement :** `notification`
- **Déclencheur / filtre :** matcher `agent_idle|agent_completed`
- **Situations :** Notification ciblée ; autre notification ignorée.

```text
/create-hook Crée « Signal d’inactivité CLI » avec l’événement `notification` (matcher `agent_idle|agent_completed`). CLI seulement : journaliser l’inactivité et ajouter au besoin un contexte bref ; garantir absence de blocage. Scénarios d’acceptation : Notification ciblée ; autre notification ignorée. Analyse le dépôt, identifie la stack et l’hôte (VS Code Local/Copilot CLI/cloud). Crée un hook JSON version 1 dans `.github/hooks/`, un script robuste et des tests locaux avec charges utiles JSON simulées. Respecte le schéma officiel de cet événement et la sémantique des sorties. Filtre les outils concernés, évite les dépendances non autorisées, n’exécute jamais directement les arguments reçus, masque les secrets, documente la compatibilité Windows/Linux et n’annonce aucun test non exécuté. Préserve les hooks existants.
```

## 17 — Transformation du prompt modèle

- **Événement :** `userPromptTransformed`
- **Déclencheur / filtre :** sans matcher
- **Situations :** Transformation neutre ; contenu protégé préservé ; test de compatibilité.

```text
/create-hook Crée « Transformation du prompt modèle » avec l’événement `userPromptTransformed` (sans matcher). Créer un exemple limité d’annotation contextuelle du contenu modèle, en respectant strictement les champs documentés ; ne pas réécrire les intentions de l’utilisateur ni les règles système. Scénarios d’acceptation : Transformation neutre ; contenu protégé préservé ; test de compatibilité. Analyse le dépôt, identifie la stack et l’hôte (VS Code Local/Copilot CLI/cloud). Crée un hook JSON version 1 dans `.github/hooks/`, un script robuste et des tests locaux avec charges utiles JSON simulées. Respecte le schéma officiel de cet événement et la sémantique des sorties. Filtre les outils concernés, évite les dépendances non autorisées, n’exécute jamais directement les arguments reçus, masque les secrets, documente la compatibilité Windows/Linux et n’annonce aucun test non exécuté. Préserve les hooks existants.
```

## Prompt de création globale (optionnel)

```text
Lis GUIDE_CREATION_HOOKS_GITHUB_COPILOT.md. Implémente uniquement les hooks pris en charge par ce dépôt et mon runtime, en commençant par preToolUse (sécurité), postToolUse (qualité), agentStop (validation finale), puis les hooks de cycle de vie. Génère les scripts, les tests positifs/négatifs et un rapport de compatibilité. Ne prétends pas que /create-hook fonctionne en Copilot CLI. Ne détruis aucun fichier existant.
```

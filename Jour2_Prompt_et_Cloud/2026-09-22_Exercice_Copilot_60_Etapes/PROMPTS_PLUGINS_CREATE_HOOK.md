# Prompts copiables — Hooks des plugins GitHub Copilot

Pour sessions Local compatibles, utiliser `/create-hook`. Dans Copilot CLI / mode Agent sans cette commande, retirer le préfixe. Vérifier le schéma et tester avant d’activer.

## 01. Plugin de contrôle des commandes Git

```text
/create-hook Dans mon plugin Copilot, crée un hook preToolUse contrôlant les appels d'outils shell. Détecte les opérations Git destructrices (push --force, reset --hard, clean -fd, branch -D), refuse les exemples dangereux avec un message explicite, laisse passer git status/diff et les opérations sans risque identifié. Utilise le schéma du runtime, ne suppose pas que le nom d'outil MCP est bash, fournis des tests d'entrée JSON et évite les faux positifs sur les chaînes citées ou commentaires.
```

## 02. Plugin de protection des secrets

```text
/create-hook Crée dans mon plugin un contrôle des secrets utilisant preToolUse avant commande ou écriture et postToolUse pour détecter les changements déjà effectués. Bloque les exfiltrations évidentes vers des URLs externes et les commits de vrais secrets, mais évite de stocker des secrets dans les logs. Prévois cas de vrais secrets simulés et faux positifs. Ne prétends pas qu'un postToolUse peut annuler une exfiltration.
```

## 03. Plugin de validation des fichiers créés

```text
/create-hook Génère un hook postToolUse dans mon plugin qui lance lint et tests ciblés uniquement après création/modification de fichiers source. Inspecte le JSON d'entrée et les outils réels ; évite de lancer la suite complète après chaque lecture ; rapporte les erreurs avec chemins sûrs et tests de non-régression.
```

## 04. Plugin d'audit des permissions

```text
/create-hook Crée un hook permissionRequest pour Copilot CLI dans mon plugin. Politique explicite : autoriser seulement les actions sûres listées, refuser les écritures dans les chemins sensibles, laisser la décision utilisateur normale pour les demandes ambiguës. Refuse un requestSandboxBypass non conforme et ne renvoie jamais allow pour préapprouver une sortie de sandbox. Tests JSON allow/deny/aucune décision et compatibilité cloud documentée.
```

## 05. Plugin de traçabilité d'un agent de revue

```text
/create-hook Ajoute à mon plugin des hooks subagentStart et subagentStop : journalisation locale minimale du nom et statut du sous-agent reviewer, vérification du rapport de code review (sévérité, fichiers, tests). Aucun contenu sensible dans les logs. Prends en charge les noms d'agents réels du runtime et teste l'absence de sous-agent.
```

## 06. Plugin de diagnostic des erreurs d'outils

```text
/create-hook Crée un hook postToolUseFailure dans mon plugin : classifie les erreurs d'exécution, fournit à l'agent un contexte de diagnostic sûr et des suggestions de correction, sans relancer automatiquement une commande destructive ni exposer les secrets. Ajoute tests sur erreurs de build, de permissions et outils externes.
```

## 07. Plugin Quality Gate de fin de tâche

```text
/create-hook Dans le plugin, ajoute un agentStop Quality Gate : avant la fin de la tâche, vérifie les tests, lint et build pertinents et demande la poursuite seulement si un problème vérifiable subsiste. Évite les boucles infinies par compteur de tentatives. Si une vérification n'existe pas dans le projet, signale-la sans inventer de résultat. Implémente la sortie JSON exacte du runtime.
```

## 08. Plugin de validation d'API via MCP

```text
/create-hook Crée un plugin avec une politique pour outils MCP : découvre les noms réels des outils disponibles et leurs arguments avant d'écrire le matcher. Autorise les lectures de schéma et documente les mutations nécessitant validation humaine. Ne tente aucune autorisation OAuth via hook. Utilise preToolUse lorsque la mutation est observable et testable ; postToolUse pour résumer les réponses et les erreurs sans journaliser de données privées. Fournis tests avec faux serveur MCP.
```

## 09. Plugin de validation des changements SQL

```text
/create-hook Crée un hook preToolUse qui inspecte les opérations SQL exécutées au moyen des outils observables. Refuse DROP/TRUNCATE et UPDATE/DELETE sans WHERE en environnement non explicitement isolé ; laisse les SELECT en lecture seule suivre les permissions normales. Gère SQL multiligne, commentaires et chaînes, et indique clairement les limites d'analyse statique.
```

## 10. Plugin de notification de fin d'agent

```text
/create-hook Crée un hook notification non bloquant pour Copilot CLI. Sur agent_completed et permission_prompt, envoie une notification locale courte sans contenu du prompt, secrets ni arguments d'outils. Utilise le matcher documenté sur notification_type ; explique pourquoi ce hook ne s'exécute pas dans cloud agent. Tests de toutes les catégories de notification.
```

## 11. Plugin d'initialisation de l'environnement

```text
/create-hook Crée un hook sessionStart pour le plugin qui vérifie les versions Node/Python, l'existence des scripts de test et la configuration minimale de sécurité. Ne télécharge ni n'installe de paquet sans autorisation. Retourne un diagnostic lisible, et non des secrets, et teste le démarrage avec une dépendance manquante.
```

## 12. Plugin de rapport d'audit et compaction

```text
/create-hook Dans le plugin, génère preCompact pour conserver dans un fichier local non sensible les décisions techniques vérifiables, et sessionEnd pour produire un bref bilan des contrôles exécutés. N'enregistre jamais les prompts complets ni les résultats d'outils sensibles ; purge les fichiers temporaires ; teste absence de répertoire inscriptible et compaction manuelle/automatique.
```

## Prompt maître

```text
Agis comme architecte GitHub Copilot CLI / VS Code et mainteneur de plugins Agent Plugins 1.0. Analyse le dépôt et génère un plugin nommé copilot-dev-guard : plugin.json Open Plugin Spec valide, com.github.copilot/hooks/hooks.json, scripts de contrôle, tests et README. Implémente seulement les 12 scénarios pertinents de CAS_PLUGINS_HOOKS_GITHUB_COPILOT.md. Utilise des types d'événements différents, des matchers spécifiques et le contrat officiel des permissions. Ne crée aucune permission OAuth implicite et ne contourne aucune approbation humaine. Vérifie les chemins et les noms d'outils dans l'environnement cible. N'installe pas et ne publie pas le plugin sans ma validation. Retourne une matrice scénario / événement / sécurité / test et une liste des écarts de compatibilité.
```

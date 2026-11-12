# GitHub Copilot CLI — Référence complète des commandes

**Mise à jour : 12 novembre 2026** · **Langue : français** · **Périmètre : Copilot CLI (terminal), pas GitHub Copilot Chat VS Code ni GitHub Copilot App.**

> **Portée et vérification.** Ce document reprend les commandes, alias, sous-commandes et options présentés par la référence officielle GitHub Copilot CLI consultée le 12 novembre 2026. Certaines entrées sont expérimentales, conditionnées au compte, à la plateforme, à l'organisation ou à la version. **La source de vérité pour votre installation reste `copilot help` puis `/help` dans une session.** Ne pas confondre les commandes `/...` avec les commandes `copilot ...` du shell.

## Table des matières

1. Démarrage et commandes du terminal
2. Toutes les commandes `/` de l'interface interactive
3. Sous-commandes des plugins, MCP, skills et agents
4. Options et flags de lancement
5. Raccourcis clavier et symboles spéciaux
6. Permissions, sandbox et sécurité
7. Scénarios de travail copiables
8. Commandes historiques, dépréciées ou limitées
9. Méthode de vérification locale et sources

## 1. Commandes à exécuter directement dans le terminal

| Commande | Fonction |
|---|---|
| `copilot` | Lance l'interface interactive. |
| `copilot app` | Ouvre la GitHub Copilot App dans le dossier courant, si elle est disponible. |
| `copilot completion bash` | Génère l'autocomplétion Bash. |
| `copilot completion zsh` | Génère l'autocomplétion Zsh. |
| `copilot completion fish` | Génère l'autocomplétion Fish. |
| `copilot config [KEY] [VALUE]` | Consulte ou modifie un paramètre hors session interactive. |
| `copilot help [TOPIC]` | Affiche l'aide ; thèmes : `billing`, `config`, `commands`, `environment`, `logging`, `monitoring`, `permissions`, `providers`, `sandbox`. |
| `copilot init` | Initialise les instructions personnalisées du dépôt. |
| `copilot login` | Authentification GitHub. |
| `copilot mcp` | Gestion des serveurs MCP hors session. |
| `copilot memories import FILE` | Importe des mémoires depuis un JSONL. |
| `copilot plugin` | Gestion des plugins et marketplaces hors session. |
| `copilot instruction list` | Liste les sources d'instructions détectées. |
| `copilot lsp list` | Liste les serveurs LSP configurés. |
| `copilot sandbox ca` | Gère l'autorité de certification du proxy sandbox. |
| `copilot skill` | Gestion des skills hors session. |
| `copilot update` | Met à jour le CLI. |
| `copilot version` | Affiche la version. |
| `copilot workflow run WORKFLOW-NAME` | Exécute un workflow dynamique enregistré. |

**Options d'authentification** : `copilot login --host HOST`, `--web-flow`, `--device-code`, `--with-token` (token sur stdin ; ne jamais le placer en clair dans un prompt).

**Configuration :** `copilot config --list`, `copilot config --list --json`, `copilot config --repo --list --json`, `copilot config KEY VALUE`, `copilot config --rm KEY`, scopes `--global`, `--repo`, `--local`.

**Inspection :** `copilot instruction list --json`, `copilot lsp list --json`, `copilot memories import fichier.jsonl --dry-run`, `copilot memories import fichier.jsonl --on-conflict skip --output json`.

## 2. Commandes slash interactives (`/`)

Ces commandes sont tapées **dans la zone de prompt du CLI**, pas dans le shell habituel. Les commandes expérimentales nécessitent parfois `/experimental on` et peuvent ne pas figurer dans votre installation.

### Navigation et sessions

| Commande | Définition / usage |
|---|---|
| `/help` | Liste les commandes proposées par la version installée. |
| `/clear [PROMPT]` | Nouvelle conversation ; alias `/new`, `/reset`. |
| `/new worktree` | Nouvelle conversation dans un nouveau Git worktree. |
| `/exit` | Ferme la session ; alias `/quit` ; `/exit print` peut proposer la transcription. |
| `/cwd` | Affiche le répertoire courant ; `/cd [PATH]` le change. |
| `/resume [SESSION-ID]` | Choisit/reprend une session ; alias `/continue [SESSION-ID]`. |
| `/session [info|checkpoints [n]|files|plan|rename [NAME]|cleanup|prune|delete [ID]|delete-all]` | Affiche ou gère des sessions ; alias `/sessions`. |
| `/rename [NAME]` | Renomme la session active. |
| `/restart` | Redémarre le CLI tout en restaurant les sessions. |
| `/fork [NAME]` | Duplique une session ; alias `/branch [NAME]` ; `/fork worktree` isole dans un worktree. |
| `/worktree [branch|task]` | Crée et ouvre un worktree. |
| `/move [branch|task]` | Déplace les changements non commités vers un nouveau worktree. |
| `/undo` | Retour à un tour antérieur ; alias `/rewind` ; certaines restaurations de fichiers sont irréversibles. |
| `/context` | Visualise les tokens/contexte. |
| `/compact [FOCUS-INSTRUCTIONS]` | Compresse le contexte avec éventuelle priorité. |
| `/copy` | Copie la dernière réponse. |
| `/search [QUERY]` | Recherche dans la conversation ; alias `/find`. |
| `/diff` | Inspecte les modifications ; fonctionnalité expérimentale. |
| `/env` | Affiche ressources chargées : hooks, agents, plugins, MCP, skills, LSP, etc. |
| `/add-dir PATH` | Autorise un dossier et charge les configurations de confiance associées. |
| `/list-dirs` | Liste les dossiers autorisés. |
| `/share [link|off|file|html|gist|research] [...]` | Partage/exporte la session ; alias `/export`. |
| `/app` | Ouvre la session dans Copilot App, si compatible. |
| `/remote [on|off]` | Contrôle distant, suivant les droits du compte. |
| `/user [show|list|switch]` | Gère les comptes connectés. |

### Agent, raisonnement et production

| Commande | Définition / usage |
|---|---|
| `/agent` | Choisit un agent personnalisé. |
| `/subagents` | Configure les modèles des sous-agents ; alias `/agents`. |
| `/tasks` | Affiche les tâches, agents secondaires et commandes shell. |
| `/fleet [PROMPT]` | Décompose une tâche pour plusieurs sous-agents en parallèle. |
| `/autopilot [OBJECTIVE]` | Mode autonome basé sur objectif ; alias `/goal` ; option `--max-ai-credits N`. |
| `/plan [PROMPT]` | Demande un plan avant implémentation. |
| `/delegate [PROMPT]` | Délègue des changements vers un dépôt distant, avec PR. |
| `/review [PROMPT]` | Exécute une revue de code. |
| `/security-review [PROMPT]` | Revue de sécurité ciblée sur les modifications locales. |
| `/rubber-duck [PROMPT]` | Obtient une seconde opinion critique. |
| `/research TOPIC` | Recherche approfondie avec sources. |
| `/refine TEXT` | Réécrit/améliore un prompt avant envoi. |
| `/ask [QUESTION]` | Question latérale sans enrichir l’historique ; alias `/btw`. |
| `/model [--session|--global|--repo|--local] [MODEL|auto TIER]` | Choisit un modèle ; alias `/models` ; tiers `efficiency`, `balance`, `intelligence`. |
| `/limits` | Ouvre les limites de crédits par réponse. |
| `/limits set max-ai-credits VALUE` | Définit une limite souple de crédits par réponse. |
| `/limits unset [max-ai-credits|all]` | Retire une limite. |
| `/pr [view|create|fix|auto|automerge]` | Inspecte, crée, répare ou automatise une pull request. |
| `/workflows` | Affiche les workflows en cours (accès conditionné). |

### Personnalisation et intégrations

| Commande | Définition / usage |
|---|---|
| `/init [suppress|INSTRUCTIONS]` | Initialise les instructions et capacités agentiques. |
| `/instructions` | Active/désactive les fichiers d’instructions. |
| `/plugin` | Ouvre le panneau des plugins. |
| `/plugin install SOURCE` | Installe un plugin. |
| `/plugin update PLUGIN[@MARKETPLACE]` | Met un plugin à jour. |
| `/plugin uninstall PLUGIN[@MARKETPLACE]` | Désinstalle ; alias `remove`/`rm`. |
| `/plugin list` | Liste les plugins ; alias `ls`. |
| `/plugin marketplace add SOURCE` | Ajoute une marketplace. |
| `/plugin marketplace remove NAME` | Supprime une marketplace. |
| `/plugin marketplace list` | Liste les marketplaces. |
| `/plugin marketplace browse NAME` | Explore une marketplace. |
| `/plugin marketplace update [NAME]` | Actualise le catalogue ; alias `refresh`. |
| `/mcp [config|list|show|add|edit|delete|disable|enable|auth|reload|search] [SERVER]` | Consulte et configure les serveurs MCP. |
| `/skills` | Panneau des skills. |
| `/skills list` | Liste les skills. |
| `/skills info NAME` | Détails d’un skill. |
| `/skills add [--project] <FILE|URL|DIRECTORY>` | Ajoute un skill. |
| `/skills remove <NAME|DIRECTORY>` | Supprime un skill. |
| `/skills reload` | Recharge les skills. |
| `/lsp [show|test|reload|logs|help] [SERVER]` | Gère les Language Servers. |
| `/extensions [manage|mode]` | Extensions CLI ; alias `/extension` ; expérimental. |
| `/ide` | Connecte un workspace VS Code. |
| `/settings [--repo|--local] [show KEY|KEY|KEY VALUE]` | Consulte/modifie les paramètres ; alias `/config`. |
| `/theme [default|github|dim|high-contrast|colorblind]` | Change le thème. |
| `/statusline` | Personnalise la barre de statut ; alias `/footer`. |
| `/terminal-setup` | Configure la saisie multilignes. |
| `/vim` | Active/désactive le mode d’édition Vim. |
| `/voice [on|off|models|devices]` | Gère la dictée vocale. |
| `/clikit [COMPONENT]` | Aperçu de composants de l’UI CLI. |
| `/tuikit [colors|icons|select|tabbar]` | Aperçu de composants TUIkit. |

### Sécurité, diagnostic et maintenance

| Commande | Définition / usage |
|---|---|
| `/permissions [default|assisted|allow-all|show]` | Définit/affiche le mode de permissions. |
| `/permissions reset` | Réinitialise les approbations de session. |
| `/allow-all [on|off|show]` | Alias de permissions étendues ; alias `/yolo`. |
| `/reset-allowed-tools` | Réinitialise les autorisations de session. |
| `/sandbox [config|status|policy [COMMAND]|enable|disable]` | Configure ou inspecte l’isolation. |
| `/sandbox ca [create|trust|rotate|remove]` | Gère la CA du proxy sandbox. |
| `/diagnose [PROMPT]` | Diagnostique les erreurs de la session. |
| `/collect-debug-logs [file|gist|share] [PATH]` | Collecte les journaux de débogage. |
| `/experimental [on|off|show]` | Contrôle les fonctionnalités expérimentales. |
| `/feedback` | Envoie un retour ; alias `/bug`. |
| `/changelog [summarize] [VERSION|last N|since VERSION]` | Notes de version ; alias `/release-notes`. |
| `/update [stable|prerelease]` | Met à jour le CLI ; alias `/upgrade`. |
| `/downgrade VERSION` | Retour à une version donnée (offre équipe, si disponible). |
| `/usage` | Statistiques de consommation et tokens. |
| `/version` | Version installée. |
| `/login` | Connexion. |
| `/logout` | Déconnexion. |
| `/keep-alive [on|off|busy|DURATION]` | Empêche la veille ; alias `/caffeinate`. |
| `/after [DELAY PROMPT]` | Exécution différée unique dans la session ; expérimental. |
| `/every [INTERVAL] PROMPT` | Exécution récurrente dans la session ; expérimental. |

## 3. Sous-commandes : plugins, MCP, skills, agents et automatisations

### Plugins

```text
/plugin
/plugin list
/plugin install SOURCE
/plugin update NOM
/plugin uninstall NOM
/plugin marketplace add SOURCE
/plugin marketplace list
/plugin marketplace browse NOM
/plugin marketplace update NOM
/plugin marketplace remove NOM
```

En shell : `copilot plugin` (sous-commandes détaillées dans `copilot plugin --help` et la référence plugin). **Attention : `/plugins` est supprimée.**

### MCP

```text
/mcp
/mcp list
/mcp show
/mcp show NOM
/mcp add
/mcp edit NOM
/mcp auth NOM
/mcp disable NOM
/mcp enable NOM
/mcp reload
/mcp delete NOM
/mcp search
```

`/mcp list` et `/mcp show` peuvent servir à diagnostiquer un serveur. Ne pas modifier le serveur fourni par un dépôt de confiance depuis le panneau utilisateur : modifier son fichier `.mcp.json`.

### Skills

```text
/skills
/skills list
/skills info NOM
/skills add --project CHEMIN
/skills remove NOM
/skills reload
```

### Agents, sous-agents, tâches

```text
/agent
/subagents
/tasks
/fleet Audite indépendamment les modules API, tests et sécurité.
/plan Prépare un plan de migration sans modifier le code.
/review Vérifie le diff et classe les problèmes par gravité.
/security-review Analyse les vulnérabilités introduites par le diff.
```

**Important :** les fichiers `*.agent.md` ne sont pas créés par une commande slash universelle `/create-agent` dans le CLI. Demander à l'agent de créer le fichier, ou utiliser les capacités propres à l'IDE concerné. La commande `/create-hook` de certains environnements VS Code n'est pas une commande CLI universelle documentée dans la référence ici.

## 4. Options et flags du programme `copilot`

| Option | Définition |
|---|---|
| `--add-dir=PATH` | Ajoute un dossier autorisé. |
| `--add-github-mcp-tool=TOOL` | Active un outil GitHub MCP. |
| `--add-github-mcp-toolset=TOOLSET` | Active un groupe d’outils GitHub MCP. |
| `--additional-mcp-config=JSON` | Ajoute une configuration MCP temporaire. |
| `--agent=AGENT` | Démarre avec un agent personnalisé. |
| `--allow-all` | Autorise outils, chemins et URL. |
| `--allow-all-mcp-server-instructions` | Charge toutes les instructions initiales des serveurs MCP. |
| `--allow-all-paths` | Autorise tous les chemins. |
| `--allow-all-tools` | Autorise tous les outils, sous réserve des règles de refus. |
| `--allow-all-urls` | Autorise toutes les URL. |
| `--allow-tool=TOOL` | Préautorise certains outils. |
| `--allow-url=URL` | Préautorise certaines URL. |
| `--acp` | Démarre comme serveur ACP. |
| `--assisted-approval` | Approbation assistée en non-interactif uniquement. |
| `--attachment PATH` | Attache un fichier au prompt initial. |
| `--autopilot` | Active la continuation autonome. |
| `--available-tools=TOOL` | Restreint les outils disponibles. |
| `--banner / --no-banner` | Affiche ou masque la bannière. |
| `--bash-env / --no-bash-env` | Active ou désactive BASH_ENV. |
| `-C DIRECTORY` | Définit le dossier de travail. |
| `--connect[=SESSION-ID]` | Connecte une session distante. |
| `--context TIER` | Taille de contexte : default ou long_context. |
| `--config-dir=DIRECTORY` | Ancienne option ; préférer COPILOT_HOME. |
| `--continue` | Reprend la dernière session. |
| `--deny-tool=TOOL` | Interdit des outils. |
| `--deny-url=URL` | Interdit des domaines/URL. |
| `--disable-builtin-mcps` | Désactive les MCP embarqués. |
| `--disable-client-telemetry` | Désactive la télémétrie client. |
| `--disable-mcp-server=SERVER-NAME` | Désactive un MCP. |
| `--disallow-temp-dir` | Refuse l’accès automatique au dossier temporaire. |
| `--effort=LEVEL / --reasoning-effort=LEVEL` | Règle l’effort de raisonnement. |
| `--enable-all-github-mcp-tools` | Active tous les outils GitHub MCP. |
| `--enable-mcp-server=SERVER-NAME` | Réactive temporairement un MCP. |
| `--enable-memory` | Active la mémoire en mode prompt. |
| `--enable-reasoning-summaries` | Option de compatibilité ignorée. |
| `--excluded-tools=TOOL` | Retire certains outils du modèle. |
| `--experimental / --no-experimental` | Active/désactive les fonctions expérimentales. |
| `--extension-sdk-path DIRECTORY` | Fournit un SDK local pour les extensions. |
| `--fleet` | Orchestre des sous-agents en parallèle. |
| `-h / --help` | Affiche l’aide. |
| `-i PROMPT / --interactive=PROMPT` | Ouvre l’interface et soumet un prompt. |
| `--log-dir=DIRECTORY` | Dossier des logs. |
| `--log-level=LEVEL` | Niveau de journalisation. |
| `--max-ai-credits=CREDITS` | Plafond souple de crédits par réponse. |
| `--max-autopilot-continues=COUNT` | Limite les continuations automatiques hors objectif. |
| `--mode=MODE` | Mode initial : interactive, plan, autopilot. |
| `--model=MODEL` | Sélectionne un modèle, ou auto. |
| `--mouse[=VALUE] / --no-mouse` | Gère la souris en interface CLI. |
| `-n NAME / --name=NAME` | Nomme une session. |
| `--no-ask-user` | Interdit l’outil de questions à l’utilisateur. |
| `--no-auto-update` | Désactive les mises à jour automatiques. |
| `--no-color` | Supprime les couleurs. |
| `--no-custom-instructions` | Ignore les instructions personnalisées. |
| `--no-remote` | Option supprimée. |
| `--no-remote-export` | Ancien nom de --sync-session=off. |
| `--output-format=FORMAT` | text ou json (JSONL). |
| `-p PROMPT / --prompt=PROMPT` | Exécute un prompt sans interface interactive. |
| `--plan` | Démarre en mode plan. |
| `--plain-diff` | Désactive l’affichage enrichi du diff. |
| `--plugin-dir=DIRECTORY` | Charge un plugin local. |
| `--remote` | Ancienne option, hors démarrage interactif. |
| `--remote-export` | Ancien nom de --sync-session=on. |
| `-r / --resume[=VALUE]` | Reprend une session par ID/nom ou ouvre le sélecteur. |
| `-s / --silent` | N’imprime que la réponse. |
| `--screen-reader` | Optimise l’accessibilité. |
| `--secret-env-vars=VAR` | Masque des variables secrètes. |
| `--session-id ID` | Session précise. |
| `--trust-folder` | Approuve ponctuellement les configurations du dossier (non-interactif). |
| `--sandbox / --no-sandbox` | Active/désactive le sandbox dans les limites des règles entreprise. |
| `--share=PATH` | Exporte la session non interactive en Markdown. |
| `--share-gist` | Exporte en gist secret. |
| `--stream=MODE` | Streaming on/off. |
| `--sync-session[=on|off]` | Synchronise l’historique (pas le contrôle distant). |
| `-v / --version` | Version. |
| `-w / --worktree[=NAME]` | Démarre dans un worktree isolé. |
| `--yolo` | Alias de --allow-all. |

## 5. Raccourcis, symboles et navigation

| Saisie | Action |
|---|---|
| `@ FICHIER` | Ajoute un fichier au contexte. |
| `# NUMÉRO` | Référence un issue ou une PR GitHub. |
| `! COMMANDE` | Exécute une commande shell directement, sans passer par le modèle. |
| `!` seul | Entre en mode commandes shell ; `Esc` pour revenir. |
| `$` seul | Suspend l’UI et ouvre un shell interactif sur terminal local compatible. |
| `/` | Affiche les commandes slash. |
| `?` | Aide rapide. |
| `Esc` | Annule ; deux fois peut interrompre un tour. |
| `Ctrl+C` | Annule/vide la saisie ; deux fois pour quitter. |
| `Ctrl+D` | Ferme l'interface. |
| `Ctrl+L` | Efface l'affichage dans les interfaces qui le prennent en charge. |
| `Ctrl+A / Ctrl+E` | Début/fin de la ligne saisie. |
| `Ctrl+B / Ctrl+F` | Caractère précédent/suivant. |
| `Ctrl+H` | Supprime le caractère précédent. |
| `Ctrl+K / Ctrl+U` | Efface après/avant le curseur. |
| `Ctrl+W` | Efface le mot précédent. |
| `Ctrl+P` | Historique des commandes. |
| `↑ / ↓` | Parcourt l’historique. |
| `Tab / Ctrl+Y` | Accepte la complétion. |
| `Shift+Enter` | Nouvelle ligne ; alternatives selon le système : `Alt+Enter`, `Option+Enter`. |
| `Ctrl+T` | Affiche/masque les détails de raisonnement disponibles. |
| `Ctrl+O / Ctrl+E` | Déploie des éléments récents / tous les éléments de la timeline lorsque la zone de saisie est vide. |
| `Ctrl+X` puis `g` | Déploie/replie le panneau d'objectif Autopilot. |
| `Ctrl+X` puis `h` | Masque la barre latérale. |
| `Ctrl+X` puis `o` | Ouvre le dernier lien de la timeline. |
| `Ctrl+X` puis `v` | Dictée vocale. |
| `Ctrl+X` puis `x` | Ferme la session active. |
| `Ctrl+Z` | Suspend le processus (Unix). |

**Dans `/diff` :** `j/k` ou `↓/↑` pour naviguer, `h/l` ou `←/→` pour changer de fichier, `c` pour commenter une ligne, `s` pour les commentaires, `b` pour basculer entre changements non indexés et diff de branche, `w` pour ignorer les changements d'espaces, `Enter` pour soumettre les commentaires, `Esc` pour quitter. La disponibilité et les raccourcis peuvent varier selon la version.

## 6. Permissions et sécurité

| Commande | Effet | Risque / recommandation |
|---|---|---|
| `/permissions show` | Affiche le mode actuel. | Recommandé avant une opération sensible. |
| `/permissions default` | Revient au mode standard. | Valeur de référence pour un dépôt inconnu. |
| `/permissions assisted` | Approbations assistées pour certaines requêtes. | Ne remplace pas une revue des commandes dangereuses. |
| `/permissions allow-all` | Active les permissions très étendues. | À éviter sur un dépôt non fiable. |
| `/permissions reset` | Efface les approbations mémorisées dans la session. | Utile après une phase de travail sensible. |
| `/sandbox status` | Affiche l'état du sandbox. | À vérifier avant d'autoriser le shell. |
| `/sandbox policy npm install` | Inspecte une politique appliquée à une commande **sans l'exécuter**. | Utile pour une simulation. |
| `/sandbox enable session` | Active l'isolation pour la session. | Recommandé pour les expérimentations. |
| `--allow-tool=...` | Préautorise un outil précis. | Préférable à `--allow-all-tools`. |
| `--deny-tool=...` | Interdit un outil. | Bonne défense complémentaire. |
| `--deny-url=...` | Interdit un domaine. | Prioritaire sur `--allow-url`. |
| `--available-tools=...` | Réduit les outils présentés au modèle. | Réduction de surface d'attaque. |

**Note :** `--allow-all`, `--yolo` et leurs alias donnent des droits étendus, mais ne contournent pas nécessairement les refus explicites et les politiques d’entreprise. `--trust-folder` ne constitue pas une permission générale sur les outils. `--assisted-approval` ne fonctionne qu'en non-interactif.

## 7. Exemples opérationnels prêts à copier

### 7.1 Explorer et sécuriser un dépôt

```bash
copilot -C ./mon-projet --sandbox --plan
```

Dans le CLI :

```text
/env
/permissions show
/mcp list
/skills list
/plan Analyse l'architecture, repère les risques et propose un plan sans modifier les fichiers.
```

### 7.2 Créer une architecture multi-agent

```text
/agent
/subagents
/fleet Étudie en parallèle l'architecture, les tests, les dépendances et la sécurité du projet ; synthétise les résultats avec preuves.
```

### 7.3 Créer des fichiers d'agents personnalisés

```text
Crée .github/agents/orchestrator.agent.md,
.github/agents/developer.agent.md,
.github/agents/tester.agent.md et
.github/agents/security.agent.md.
Définis les rôles, outils minimaux, entrées/sorties,
critères d'arrêt et stratégies de délégation.
Vérifie la compatibilité Copilot CLI et réalise un test de délégation.
```

### 7.4 Gérer des skills et plugins

```text
/plugin list
/plugin marketplace list
/skills list
/skills info NOM
/skills reload
```

### 7.5 Contrôler des serveurs MCP

```text
/mcp list
/mcp show NOM
/mcp auth NOM
/mcp reload
```

### 7.6 Exécuter une tâche ponctuelle dans un script

```bash
copilot -p "Explique la structure du dépôt et propose trois priorités" --output-format=json
```

### 7.7 Exécuter une revue de code sans écriture (sous réserve des outils disponibles)

```bash
copilot -p "Analyse la qualité du code sans modifier de fichier" --available-tools="view,grep,glob"
```

> Vérifier les identifiants des outils avec `copilot help`, car la liste dépend du runtime. Les instructions textuelles seules ne garantissent pas l'absence de modifications.

### 7.8 Automatiser la vérification des tests avec sous-agents

```bash
copilot --fleet -p "Répartis l'analyse entre un agent tests, un agent sécurité et un agent architecture. Ne modifie pas de fichier et fournis un rapport consolidé."
```

### 7.9 Revue et sécurité avant commit

```text
/diff
/review
/security-review
/pr view
```

### 7.10 Isoler une nouvelle fonctionnalité

```bash
copilot --worktree=feature-api -i "Implémente l'API dans ce worktree ; tests obligatoires avant proposition de PR."
```

### 7.11 Diagnostiquer une session

```text
/diagnose Pourquoi les outils MCP échouent-ils ?
/env
/collect-debug-logs file
```

### 7.12 Utilisation en salle de formation

```text
/help
/version
/model
/permissions show
/sandbox status
/subagents
/tasks
/usage
```

### 7.13 Exécuter un workflow enregistré

```bash
copilot workflow run NOM_DU_WORKFLOW
```

### 7.14 Programmer un rappel expérimental dans une session

```text
/experimental on
/after 30m vérifie les résultats des tests
/every 1h analyse les erreurs récentes des tests
```

Ces tâches sont **liées à la session CLI** : elles ne remplacent pas un ordonnanceur système ni GitHub Actions.

## 8. Commandes et options historiques, spécifiques ou supprimées

| Nom | Statut / remarque |
|---|---|
| `/plugins` | **Supprimée** : utiliser `/plugin`, `/mcp`, `/skills`, `/subagents`, `/instructions`. |
| `copilot plugins` | Alias historique de `copilot plugin`. |
| `/worktree new` | Dépréciée : utiliser `/new worktree`. |
| `--config-dir` | Dépréciée : utiliser `COPILOT_HOME`. |
| `--no-remote` | Supprimée ; utiliser `/remote off` en session. |
| `--remote-export` et `--no-remote-export` | Renommées en `--sync-session=on/off`. |
| `--enable-reasoning-summaries` | Acceptée mais ignorée. |
| `/after`, `/every`, `/extensions`, `/diff` | Fonctionnalités expérimentales ou dépendantes de la version. |
| `/create-hook` | Commande de certains contextes d'éditeur, **non répertoriée comme commande slash universelle du CLI**. |
| `/create-agent` | Ne pas supposer son existence en CLI ; utiliser un prompt pour générer les `.agent.md`. |
| `gh copilot ...` | Ancien outil/extension GitHub CLI distinct ; ne pas confondre avec le programme `copilot`. |

## 9. Vérification et documentation officielles

Pour un inventaire **strictement exact pour votre version installée**, exécutez :

```bash
copilot version
copilot help
copilot help commands
copilot help permissions
copilot help environment
copilot plugin --help
copilot mcp --help
copilot skill --help
```

Puis dans l'interface interactive :

```text
/help
/env
/experimental show
```

Les changements de version peuvent ajouter, retirer ou renommer des commandes. La **référence officielle en ligne** est une photographie de l'état documentaire du jour ; elle ne garantit pas que toutes les entrées soient activées sur votre compte.

### Sources officielles

- [Référence GitHub Copilot CLI — commandes et options](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference)
- [Référence CLI — navigation](https://docs.github.com/en/copilot/reference/copilot-cli-reference)
- [Référence CLI — utilisation programmatique](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-programmatic-reference)
- [Référence CLI — plugins](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-plugin-reference)
- [Installation](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli)

---

**Objectif pédagogique :** utiliser ce fichier comme aide-mémoire lors des formations et comme source de prompts Copilot, sans présenter les commandes IDE ou GitHub Copilot App comme des commandes Copilot CLI.

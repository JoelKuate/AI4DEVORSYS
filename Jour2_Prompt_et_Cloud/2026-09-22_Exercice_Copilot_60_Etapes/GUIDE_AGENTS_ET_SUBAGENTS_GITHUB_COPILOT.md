# Guide pratique — Agents et sous-agents GitHub Copilot

**Édition : 12 novembre 2026 — VS Code (harness Copilot) et Copilot CLI**  
**Objectif :** comprendre les options d'un agent `.agent.md`, créer des agents spécialisés et orchestrer plusieurs sous-agents avec des prompts directement copiables.

> **Compatibilité importante.** Le *harness* Copilot utilise son mécanisme natif de délégation (`task`). La propriété YAML `agents:` et les `handoffs:` concernent le **harness Local de VS Code**, déprécié, et ne doivent **pas** être copiés dans un agent destiné au harness Copilot actuel. Un agent peut déléguer par ses instructions et ses outils si le runtime le permet. Les capacités exactes dépendent de la version, du modèle et des outils disponibles.

## 1. Structure et emplacement

Un agent est un fichier Markdown avec un en-tête YAML :

```text
mon-projet/
└── .github/
    ├── agents/
    │   ├── orchestrateur.agent.md
    │   ├── researcher.agent.md
    │   ├── implementer.agent.md
    │   ├── tester.agent.md
    │   ├── security-reviewer.agent.md
    │   └── reviewer.agent.md
    ├── skills/
    │   └── code-quality/SKILL.md
    ├── hooks/
    │   └── quality.json
    └── copilot-instructions.md
```

Un agent personnel Copilot peut aussi être placé dans `~/.copilot/agents/`. Le champ `target: github-copilot` aide l'éditeur à valider le bon schéma, mais **ne change pas à lui seul le harness actif**.

## 2. Options YAML des agents — référence annotée

| Option | Description | Remarque de compatibilité |
|---|---|---|
| `name` | Nom présenté aux utilisateurs et utilisé pour identifier l'agent | Facultatif, sinon nom du fichier ; respecter la casse lors d'une invocation explicite. |
| `description` | Spécialité et conditions d'utilisation de l'agent | **Requis dans le schéma Copilot** ; très important pour la sélection automatique. |
| `target` | `github-copilot` ou `vscode` pour l'interprétation du fichier dans VS Code | Ne bascule pas la session vers un autre harness. |
| `tools` | Liste des outils/alias autorisés | Restreindre au minimum nécessaire. |
| `model` | Modèle préféré, ou liste ordonnée de modèles | Vérifier les identifiants réellement disponibles. |
| `model-policy` | `preferred` ou `required` | VS Code peut l'imposer à l'agent sélectionné ; **pas une garantie globale au runtime**. |
| `reasoning-effort` | Niveau initial de raisonnement lorsque le modèle le prend en charge | Valeurs dépendantes du modèle. |
| `skills` | Noms de skills disponibles pour cet agent | Prise en charge Copilot ; vérifier leur disponibilité. |
| `user-invocable` | Afficher (`true`) ou cacher (`false`) l'agent dans le sélecteur | `false` convient à un sous-agent spécialisé. |
| `disable-model-invocation` | Empêcher (`true`) ou permettre (`false`) l'invocation comme sous-agent | Valeur par défaut : `false`. |
| `hooks` | Événements et actions automatiques propres à l'agent | Contrôles indépendants des simples instructions textuelles. |
| `mcp-servers` | Déclarations de serveurs MCP propres à l'agent | Schéma Copilot, mais limites de transmission/runtime : préférer la configuration MCP effectivement prise en charge. |
| `github` | `toolsets` et `permissions` du MCP GitHub | Schéma éditeur ; ne pas supposer que ces champs sont transmis au runtime. |
| `deferred-tool-loading` | Chargement à la demande des outils | Champ schéma Copilot, avec limites de conversion. |
| `strict-tools-list` | Limiter strictement les outils additionnels | Champ schéma Copilot, avec limites de conversion. |
| `include-custom-instructions` | Inclusion des instructions personnalisées du dépôt | Champ schéma Copilot, avec limites de conversion. |
| `infer` | Ancien contrôle d'invocation | **Déprécié** ; utiliser les deux champs d'invocation ci-dessus. |
| `agents` | Liste blanche de sous-agents | **Local uniquement** ; non pris en charge dans le schéma Copilot actuel. |
| `handoffs` | Boutons de transition entre agents | **Local uniquement** ; distinct d'une délégation par sous-agent. |
| `argument-hint` | Indication de saisie dans le chat | **Local uniquement**. |
| `advancedOptions` | Options avancées | **Local uniquement**. |
| `metadata` | Métadonnées diverses | Ne pas la considérer comme option portable garantie : valider contre le schéma cible. |

### Outils intégrés dans le harness Copilot

- `read` : lecture de fichiers ; `search` : recherche dans les sources.
- `edit` : modification des fichiers ; `execute` : commandes shell.
- `agent` : capacité de délégation ; dans le runtime Copilot, la délégation utilise l'outil natif `task`.
- `web` : recherche web lorsqu'elle est disponible ; `todo` : suivi des tâches.
- `*` : tous les outils disponibles (à éviter dans un agent à privilèges limités).
- `<serveur-mcp>/*` : outils d'un serveur MCP configuré et réellement disponible.

**Permissions :** les instructions « ne modifie pas » ne constituent pas une barrière de sécurité. Pour un agent de lecture, utiliser `tools: ['read', 'search']`. Les approbations et la sandbox du runtime restent distinctes des permissions exprimées dans un fichier agent.

### Différences entre agent, skill, hook, MCP et plugin

| Composant | Usage |
|---|---|
| Agent | Rôle, objectifs, accès outils, format des résultats. |
| Sous-agent | Agent exécutant une sous-tâche ciblée et retournant son résultat au parent. |
| Skill | Procédure réutilisable avec instructions, ressources ou scripts. |
| Hook | Contrôle automatisé déclenché à une étape du cycle d'exécution. |
| MCP | Connexion à des outils/services externes. |
| Plugin | Paquet distribuant plusieurs éléments de personnalisation. |

## 3. Architecture d'orchestration recommandée

```text
Demande utilisateur
       |
       v
Orchestrateur (décomposition, arbitrage, synthèse)
       |
       +--> Researcher (lecture, exploration)
       +--> Security Reviewer (audit en lecture)
       +--> Implementer (modifications ciblées)
       +--> Tester (tests et diagnostic)
       +--> Reviewer (revue finale indépendante)
       |
       v
Rapport de validation + limites + fichiers modifiés
```

**Règles d'orchestration :** déléguer uniquement des sous-tâches délimitées ; transmettre les contraintes pertinentes au sous-agent ; éviter deux modifications simultanées du même fichier ; paralléliser surtout les inspections indépendantes ; ne pas prendre une sortie de sous-agent pour une preuve sans validation ; limiter les boucles de délégation et les coûts.

## 4. Exemples de fichiers agents prêts à adapter

### 4.1 Agent orchestrateur — `.github/agents/orchestrateur.agent.md`

```markdown
---
name: orchestrateur
description: Coordonne recherche, implémentation, tests et revue de code en déléguant les tâches spécialisées pertinentes.
target: github-copilot
tools: ['read', 'search', 'agent', 'todo']
user-invocable: true
disable-model-invocation: true
---
# Mission
Tu es le coordinateur technique du projet. Analyse la demande, découpe-la en tâches et délègue seulement si cela améliore la qualité du résultat.

# Sous-agents souhaités
- `researcher` : comprendre le code existant, sans modifier.
- `security-reviewer` : auditer la sécurité, sans modifier.
- `implementer` : effectuer les changements nécessaires.
- `tester` : exécuter et analyser les tests.
- `reviewer` : faire la revue finale, sans modifier.

# Protocole
1. Lire les instructions et contraintes du dépôt.
2. Établir les objectifs, les fichiers concernés et les risques.
3. Déléguer une mission précise avec contexte, limites et livrable attendu.
4. Pour des analyses indépendantes, demander une exécution parallèle si prise en charge.
5. Éviter les modifications concurrentes des mêmes fichiers.
6. Consolider les résultats et résoudre les contradictions.
7. Rapporter : plan, modifications, résultats des tests, risques restants.

Ne prétends jamais qu'un sous-agent a été exécuté si le runtime ne permet pas la délégation. Dans ce cas, explique la limite et exécute séquentiellement les opérations possibles.
```

> Note : ce coordinateur ne possède volontairement **pas** `edit` ni `execute`. Pour un orchestrateur autonome capable d'éditer directement en secours, ajouter ces outils uniquement si justifié. `disable-model-invocation: true` empêche sa sélection comme sous-agent et ne l'empêche pas d'invoquer d'autres agents si la délégation est disponible.

### 4.2 Sous-agent de recherche — `.github/agents/researcher.agent.md`

```markdown
---
name: researcher
description: Recherche les composants, conventions et dépendances du projet avant toute modification.
target: github-copilot
tools: ['read', 'search']
user-invocable: false
disable-model-invocation: false
---
Localise les fichiers pertinents et reconstruis les flux de données et d'appels.
Ne modifie rien et n'exécute aucune commande.
Retourne : (1) fichiers et symboles, (2) fonctionnement actuel, (3) risques, (4) points inconnus, (5) recommandation vérifiable.
```

### 4.3 Sous-agent implémenteur — `.github/agents/implementer.agent.md`

```markdown
---
name: implementer
description: Implémente des modifications ciblées selon une spécification et les conventions du dépôt.
target: github-copilot
tools: ['read', 'search', 'edit', 'execute']
user-invocable: false
disable-model-invocation: false
---
Implémente uniquement la tâche déléguée, après avoir identifié les conventions applicables.
Minimise le diff et préserve les interfaces publiques sauf demande explicite.
N'exécute pas d'opérations destructrices ni de déploiement sans approbation.
Retourne : fichiers modifiés, résumé des changements, commandes de vérification exécutées et résultats observés.
```

### 4.4 Sous-agent testeur — `.github/agents/tester.agent.md`

```markdown
---
name: tester
description: Prépare et exécute les tests ciblés, analyse les échecs et les régressions.
target: github-copilot
tools: ['read', 'search', 'execute']
user-invocable: false
disable-model-invocation: false
---
Identifie le framework de tests et les commandes disponibles. Lance d'abord les contrôles les plus ciblés, puis élargis.
Ne change pas le code ; propose des corrections au parent en cas d'échec.
Retourne : commandes, statut, échecs reproductibles, couverture connue et limites.
```

### 4.5 Sous-agent auditeur de sécurité — `.github/agents/security-reviewer.agent.md`

```markdown
---
name: security-reviewer
description: Audite les changements sous l'angle sécurité, secrets, entrées utilisateur, authentification et dépendances.
target: github-copilot
tools: ['read', 'search']
user-invocable: false
disable-model-invocation: false
---
Analyse les surfaces d'attaque et les chemins de données réellement visibles.
N'invente pas de vulnérabilité et ne modifie aucun fichier.
Pour chaque constat : gravité, preuve fichier/ligne, scénario plausible, remédiation, test de non-régression.
```

### 4.6 Sous-agent revue qualité — `.github/agents/reviewer.agent.md`

```markdown
---
name: reviewer
description: Effectue une revue de code indépendante centrée sur bugs, robustesse, maintenance et qualité des tests.
target: github-copilot
tools: ['read', 'search']
user-invocable: false
disable-model-invocation: false
---
Compare la modification au comportement attendu et aux tests présents.
Ne modifie aucun fichier. Ignore les remarques purement stylistiques sans impact.
Retourne les observations priorisées, avec fichier/ligne, impact et correction suggérée.
```

## 5. Prompts directement copiables dans Copilot

> **Usage :** coller chaque bloc dans une session GitHub Copilot en mode Agent. Aucun `/create-agent` universel n'est présumé : demander explicitement la création des fichiers `.agent.md`. Après création, ouvrir une nouvelle session avec le harness Copilot pour vérifier la découverte et la délégation.

### Prompt 1 — Générer l'architecture multi-agent complète

```text
Analyse ce dépôt et crée dans .github/agents/ une équipe de six agents : orchestrateur, researcher, implementer, tester, security-reviewer et reviewer.
Utilise des fichiers .agent.md avec frontmatter YAML compatible avec le harness GitHub Copilot actuel.
Pour chaque agent, définis un nom précis, une description utile à la sélection automatique, les outils minimaux, user-invocable et disable-model-invocation, son rôle, ses limites, son format de rapport et ses critères d'arrêt.
L'orchestrateur doit déléguer par l'outil natif disponible du harness Copilot ; n'utilise ni agents: ni handoffs: (réservés au harness Local).
Évite les modifications concurrentes d'un même fichier. Crée un README détaillant comment invoquer chaque agent et tester la délégation.
Valide le YAML et liste toute fonctionnalité indisponible dans cet environnement.
```

### Prompt 2 — Orchestrateur de développement d'une nouvelle fonctionnalité

```text
Crée un agent orchestrateur spécialisé dans le développement de fonctionnalités.
Scénario test : ajouter un endpoint REST paginé à ce projet.
Pipeline souhaité : researcher identifie les patterns API ; implementer modifie les fichiers ; tester vérifie cas nominaux et limites ; security-reviewer audite les contrôles d'accès ; reviewer produit la revue finale.
Rédige des tâches autonomes pour chaque sous-agent : objectif, fichiers, contraintes, résultat attendu.
Prévois un gate final : aucune réussite annoncée sans preuves de tests.
Produis les fichiers .github/agents/*.agent.md et une procédure de test reproductible. Ne suppose pas que toutes les délégations s'exécutent en parallèle.
```

### Prompt 3 — Analyse parallèle sans modification

```text
Crée un agent `audit-coordinator` en lecture seule capable de demander trois analyses indépendantes : sécurité, performance et couverture de tests.
Chaque sous-agent doit rapporter des éléments vérifiables avec fichiers/lignes, sans modification.
L'orchestrateur fusionne les résultats, retire les doublons, hiérarchise les risques et signale les désaccords.
Utilise la délégation parallèle seulement si elle est prise en charge par ce runtime ; sinon exécute les audits séquentiellement.
Génère les profils .agent.md et un exemple de prompt d'invocation.
```

### Prompt 4 — Correction d'un bug avec reproduction

```text
Crée une architecture d'agents pour corriger un bug de façon traçable : diagnostic-researcher, fixer, regression-tester et independent-reviewer.
Le researcher doit reproduire conceptuellement le chemin d'échec et identifier les fichiers ; le fixer applique une correction minimale ; le testeur lance une preuve de non-régression ; le reviewer vérifie les hypothèses.
Scénario : un utilisateur reçoit une erreur 500 sur une entrée vide.
Ajoute les limites d'outils pour chaque rôle, la procédure de rollback et un rapport final montrant ce qui a réellement été testé.
```

### Prompt 5 — Refonte/refactoring contrôlé

```text
Crée un agent de refactoring orchestrant un agent cartographie, un agent implémentation et un agent revue de non-régression.
Cas : découper un service monolithique sans changer son API publique.
Exige d'abord une liste des invariants, des appels entrants et des effets de bord ; ensuite des modifications par petites étapes ; enfin des tests comparatifs.
N'autorise pas deux sous-agents à écrire simultanément sur les mêmes fichiers. Génère les .agent.md et un exemple de rapport de compatibilité.
```

### Prompt 6 — Architecture API + base de données + sécurité

```text
Crée des agents Copilot pour faire évoluer une API connectée à une base de données : api-researcher (lecture), db-reviewer (lecture), implementer (édition), security-reviewer (lecture), tester (exécution).
Scénario : ajouter un champ à une ressource et une migration SQL.
Le db-reviewer doit contrôler index, compatibilité ascendante et rollback ; security-reviewer contrôle autorisations et validation des entrées ; tester vérifie migration et contrat API.
Ne lance aucune migration destructive ni sur une base de production sans approbation explicite.
Génère configurations, prompts d'invocation et checklists.
```

### Prompt 7 — Agent qualité CI/CD avec hooks

```text
Crée un orchestrateur `delivery-coordinator` et des sous-agents pour lint, tests, scan de secrets et revue de PR.
Associe si possible des hooks natifs et documentés pour les validations déterministes ; ne mets pas du shell arbitraire directement dans une propriété YAML non prise en charge.
Cas : avant la fin d'une tâche de développement, vérifier format, build, tests et risques évidents.
Donne à chaque sous-agent uniquement les outils nécessaires ; empêche les déploiements et push forcés non autorisés.
Fournis les .agent.md, configurations de hooks compatibles, scripts et jeux de tests positifs/négatifs.
```

### Prompt 8 — Agents utilisant un serveur MCP

```text
Analyse les outils MCP réellement connectés dans cette session.
Crée un agent orchestrateur et deux spécialistes : repository-researcher et issue-analyst, capables de travailler sur le code et les issues via les outils MCP existants.
N'invente pas les noms de serveurs ni de tools ; utilise les identifiants réels et la configuration MCP prise en charge par l'environnement.
Privilégie la lecture et la recherche ; exige une validation humaine avant toute mutation distante (issues, PR, branches).
Prévois un mode dégradé documenté si le serveur MCP n'est pas disponible.
```

### Prompt 9 — Agents de migration entre frameworks

```text
Crée une équipe d'agents pour migrer progressivement un module entre deux versions majeures d'un framework.
Rôles : dependency-researcher, migration-planner, code-migrator, compatibility-tester et reviewer.
Commence par détecter les versions installées, les incompatibilités documentées et la couverture existante.
Planifie des lots réversibles avec vérifications par lot. Évite toute mise à jour massive non justifiée.
Génère les .agent.md, un plan d'exécution et un exemple de mission déléguée à chaque sous-agent.
```

### Prompt 10 — Évaluer les agents eux-mêmes

```text
Crée un protocole de tests pour les agents du dépôt.
Prépare au moins six scénarios : recherche sans modification, correction ciblée, analyse sécurité, test en échec, délégation indisponible et conflit entre deux avis de sous-agents.
Pour chaque scénario : entrée, rôle attendu, outils permis/interdits, résultat attendu, critères mesurables et preuves observables.
Vérifie aussi le YAML et la présence des fichiers ; distingue strictement validation statique et test effectif d'exécution dans Copilot.
Ne déclare aucune capacité vérifiée si tu n'as pas pu exécuter la session concernée.
```

### Prompt 11 — Créer un agent pédagogique Python + sous-agents

```text
Crée un agent `python-mentor` pour accompagner un développeur débutant.
Il doit pouvoir déléguer une explication à `concept-explainer`, une recherche d'erreur à `debug-researcher` et une validation des tests à `exercise-reviewer`.
Les spécialistes restent en lecture seule par défaut ; aucun sous-agent ne doit réécrire entièrement la solution de l'apprenant sans sa demande.
Cas d'utilisation : expliquer une boucle, diagnostiquer un IndexError et évaluer un exercice sur les fonctions.
Génère les fichiers .agent.md et trois exemples de conversations d'essai.
```

### Prompt 12 — Agent de revue de pull request en sous-agents

```text
Crée un agent `pr-review-coordinator` en lecture seule.
Il doit déléguer l'analyse des changements à un expert correction fonctionnelle, un expert sécurité et un expert tests, puis consolider leurs avis.
Cas d'utilisation : PR modifiant l'authentification et les permissions d'accès.
Ne publie aucun commentaire ni n'approuve la PR sans confirmation. Utilise MCP GitHub uniquement si réellement disponible et avec droits appropriés.
Le rapport final doit contenir sévérité, fichier/ligne, preuve, correction, tests manquants et points non vérifiés.
```

## 6. Prompts pour invoquer une équipe déjà installée

**Revue ciblée :**

```text
Utilise les sous-agents `security-reviewer` et `reviewer` pour examiner les modifications en cours, sans éditer. Demande une revue sécurité et une revue de robustesse indépendantes ; fusionne les résultats et cite les fichiers/lignes concernés.
```

**Développement complet :**

```text
Utilise `orchestrateur` pour ajouter [FONCTIONNALITÉ]. Fais d'abord examiner l'existant par `researcher`, délègue la modification à `implementer`, les vérifications à `tester`, puis une revue indépendante à `security-reviewer` et `reviewer`. Expose les limites si l'invocation de ces agents n'est pas disponible.
```

**Audit parallèle :**

```text
Délègue en parallèle, si possible, l'étude de l'authentification à `researcher` et l'analyse des risques à `security-reviewer`. Interdis les modifications et renvoie un rapport consolidé, sourcé par fichiers et lignes.
```

## 7. Validation et tests d'acceptation

1. **Découverte** : les fichiers apparaissent parmi les custom agents du harness choisi.
2. **Schéma** : le frontmatter YAML est valide, et les noms d'outils sont reconnus.
3. **Invocation** : le coordinateur peut demander une délégation, et le sous-agent est réellement exécuté si la fonction est disponible.
4. **Isolation** : le researcher et les reviewers ne disposent pas de `edit` ni de `execute`.
5. **Livrable** : chaque sous-agent retourne un résultat délimité et vérifiable.
6. **Sécurité** : aucune mutation distante, déploiement ou commande destructive non approuvée.
7. **Résilience** : si la délégation ou MCP est indisponible, l'agent le dit sans inventer une exécution.
8. **Non-régression** : le coordinateur fournit les résultats des tests effectivement lancés, et non une estimation.

## 8. Erreurs fréquentes

- Utiliser `agents:` ou `handoffs:` avec `target: github-copilot` : ces champs relèvent de **Local**, pas du schéma Copilot actuel.
- Confondre `user-invocable: false` (agent caché dans le sélecteur) et `disable-model-invocation: true` (pas de délégation automatique).
- Donner `tools: ['*']` à tous les agents, y compris aux auditeurs en lecture seule.
- Supposer que des champs YAML validés par l'éditeur sont tous appliqués par le runtime Copilot.
- Paralléliser plusieurs agents qui modifient les mêmes fichiers sans coordination.
- Présumer qu'une préférence de modèle ou une instruction textuelle assure une frontière de sécurité.
- Confondre agent personnalisé et véritable invocation de sous-agent : vérifier les appels et résultats réels.

## 9. Documentation officielle

- [VS Code — Custom agent file reference](https://code.visualstudio.com/docs/agents/reference/custom-agent-file-reference)
- [VS Code — Custom agents](https://code.visualstudio.com/docs/agent-customization/custom-agents)
- [VS Code — Use subagents](https://code.visualstudio.com/docs/agents/run/subagents)
- [GitHub — Custom agents](https://docs.github.com/en/copilot/concepts/customizations/custom-agents)
- [GitHub — Invoke custom agents in Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/invoke-custom-agents)
- [GitHub — Custom agents and sub-agent orchestration](https://docs.github.com/en/copilot/how-tos/copilot-sdk/features/custom-agents)

---
**Conseil d'utilisation :** commencez par le prompt 1, vérifiez les fichiers créés et testez une délégation simple. Passez ensuite aux prompts spécialisés, en conservant des permissions minimales.

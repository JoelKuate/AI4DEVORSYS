/* TaskBoard — logique JS (fictif, usage formation GitHub Copilot).
   Ce fichier est volontairement incomplet : il contient un bug et des
   TODO qui servent de cibles aux étapes de l'exercice 60 étapes. */

/**
 * Formate une date ISO (YYYY-MM-DD) en format français (JJ/MM/AAAA).
 *
 * BUG VOLONTAIRE (cible de l'Étape 13 — /fix) : le mois n'est pas
 * corrigé de son décalage (Date.getMonth() est indexé à partir de 0),
 * donc la date affichée est fausse d'un mois.
 */
function formatDate(isoDate) {
  if (!isoDate) return "Sans échéance";
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return "Date invalide";
  const jour = String(d.getDate()).padStart(2, "0");
  const mois = String(d.getMonth() + 1).padStart(2, "0");
  const annee = d.getFullYear();
  return `Échéance : ${jour}/${mois}/${annee}`;
}

/* Tests unitaires simples pour formatDate (à exécuter dans un
   environnement de test type Jest, ou manuellement via console). */
function testFormatDate() {
  const assertions = [
    { input: "", expected: "Sans échéance" },
    { input: "date-invalide", expected: "Date invalide" },
    { input: "2026-12-31", expected: "Échéance : 31/12/2026" },
  ];

  let echecs = 0;
  assertions.forEach(({ input, expected }) => {
    const resultat = formatDate(input);
    if (resultat !== expected) {
      echecs++;
      console.error(
        `Échec: formatDate(${JSON.stringify(input)}) => ${JSON.stringify(
          resultat
        )}, attendu ${JSON.stringify(expected)}`
      );
    } else {
      console.log(`OK: formatDate(${JSON.stringify(input)}) => ${JSON.stringify(resultat)}`);
    }
  });

  console.log(echecs === 0 ? "Tous les tests sont passés." : `${echecs} test(s) en échec.`);
  return echecs;
}

/**
 * Retourne le libellé français d'une priorité technique.
 */
function libellePriorite(priorite) {
  const libelles = {
    low: "Basse",
    medium: "Moyenne",
    high: "Haute",
    critical: "Critique",
  };
  return Object.prototype.hasOwnProperty.call(libelles, priorite)
    ? libelles[priorite]
    : priorite;
}

/* Tests unitaires simples pour libellePriorite (à exécuter dans un
   environnement de test type Jest, ou manuellement via console). */
function testLibellePriorite() {
  const assertions = [
    { input: "low", expected: "Basse" },
    { input: "medium", expected: "Moyenne" },
    { input: "high", expected: "Haute" },
    { input: "critical", expected: "Critique" },
    { input: "unknown", expected: "unknown" },
    { input: undefined, expected: undefined },
    { input: null, expected: null },
    { input: "", expected: "" },
    { input: "toString", expected: "toString" },
  ];

  let echecs = 0;
  assertions.forEach(({ input, expected }) => {
    const resultat = libellePriorite(input);
    if (resultat !== expected) {
      echecs++;
      console.error(
        `Échec: libellePriorite(${JSON.stringify(input)}) => ${JSON.stringify(
          resultat
        )}, attendu ${JSON.stringify(expected)}`
      );
    } else {
      console.log(`OK: libellePriorite(${JSON.stringify(input)}) => ${JSON.stringify(resultat)}`);
    }
  });

  console.log(echecs === 0 ? "Tous les tests sont passés." : `${echecs} test(s) en échec.`);
  return echecs;
}

/**
 * Construit l'élément DOM d'une carte de tâche à partir d'un objet tâche
 * { title, description, priority, dueDate }.
 *
 * TODO (Étape 22 — Agent mode, multi-fichiers) : cette fonction existe
 * mais n'est appelée nulle part. Demandez à Copilot (Edit / Agent mode)
 * de relier le formulaire de index.html à cette fonction pour que
 * soumettre le formulaire ajoute une carte dans la colonne "À faire" et
 * incrémente son compteur .count.
 */
/**
 * Crée un élément HTML représentant une tâche dans le tableau.
 *
 * Le titre, la priorité, la description et l'échéance sont insérés dans
 * des éléments dédiés. Les valeurs textuelles sont affectées via
 * `textContent` afin qu'elles soient traitées comme du texte, et non comme
 * du HTML.
 *
 * @param {Object} tache - Données de la tâche à afficher.
 * @param {string} tache.title - Titre de la tâche.
 * @param {string} [tache.description] - Description facultative.
 * @param {string} tache.priority - Priorité technique de la tâche.
 * @param {string} [tache.dueDate] - Date d'échéance au format ISO.
 * @returns {HTMLElement} L'élément `<article>` représentant la tâche.
 */
function creerCarteTache(tache) {
  
  const article = document.createElement("article");
  article.className = "card";

  const titre = document.createElement("h3");
  titre.className = "card-title";
  titre.textContent = tache.title;

  const badge = document.createElement("span");
  badge.className = "badge";
  badge.dataset.priority = tache.priority;
  badge.textContent = libellePriorite(tache.priority);

  const description = document.createElement("p");
  description.className = "card-description";
  description.textContent = tache.description || "";

  const echeance = document.createElement("p");
  echeance.className = "card-due";
  echeance.textContent = formatDate(tache.dueDate);

  article.append(titre, badge, description, echeance);
  return article;
}

// TODO (Étape 58 — Capstone) : ajouter ici, avec l'aide de Copilot,
// la persistance des tâches dans localStorage, un filtre par priorité
// et/ou le glisser-déposer d'une carte entre colonnes.

document.addEventListener("DOMContentLoaded", () => {
  console.log("TaskBoard chargé — voir js/app.js pour les TODO de l'exercice.");

  const formulaire = document.querySelector(".form-panel form");
  const colonneAFaire = document.querySelector(".board .column");
  const statutTache = document.querySelector("#statut-tache");

  formulaire.addEventListener("submit", (evenement) => {
    evenement.preventDefault();

    const donnees = new FormData(formulaire);
    const tache = {
      title: donnees.get("title").trim(),
      description: donnees.get("description").trim(),
      priority: donnees.get("priority"),
      dueDate: donnees.get("dueDate"),
    };

    colonneAFaire.querySelector(".cards").append(creerCarteTache(tache));

    const compteur = colonneAFaire.querySelector(".count");
    compteur.textContent = Number(compteur.textContent) + 1;
    statutTache.textContent = `La tâche « ${tache.title} » a été ajoutée à la colonne À faire.`;
    formulaire.reset();
  });
});


// fonction qui calcule le nombre de tâches en retard
function nombreTachesEnRetard(taches) {
  const maintenant = new Date();
  return taches.filter(tache => tache.dueDate && new Date(tache.dueDate) < maintenant).length;
}

/**
 * Compte les tâches pour chaque priorité reconnue.
 *
 * @param {Array<Object>} taches - Tâches contenant une propriété `priority`.
 * @returns {Object} Le nombre de tâches pour chaque priorité.
 */
function compterTachesParPriorite(taches) {
  const compteurs = {
    low: 0,
    medium: 0,
    high: 0,
    critical: 0,
  };

  taches.forEach((tache) => {
    if (Object.prototype.hasOwnProperty.call(compteurs, tache.priority)) {
      compteurs[tache.priority]++;
    }
  });

  return compteurs;
}

/* Tests unitaires simples pour compterTachesParPriorite (à exécuter dans un
   environnement de test type Jest, ou manuellement via console). */
function testCompterTachesParPriorite() {
  const assertions = [
    {
      input: [
        { priority: "low" },
        { priority: "medium" },
        { priority: "medium" },
        { priority: "critical" },
      ],
      expected: { low: 1, medium: 2, high: 0, critical: 1 },
    },
    {
      input: [],
      expected: { low: 0, medium: 0, high: 0, critical: 0 },
    },
    {
      input: [{ priority: "unknown" }],
      expected: { low: 0, medium: 0, high: 0, critical: 0 },
    },
  ];

  let echecs = 0;
  assertions.forEach(({ input, expected }) => {
    const resultat = compterTachesParPriorite(input);
    if (JSON.stringify(resultat) !== JSON.stringify(expected)) {
      echecs++;
      console.error(
        `Échec: compterTachesParPriorite(${JSON.stringify(input)}) => ${JSON.stringify(
          resultat
        )}, attendu ${JSON.stringify(expected)}`
      );
    } else {
      console.log(`OK: compterTachesParPriorite(${JSON.stringify(input)})`);
    }
  });

  console.log(echecs === 0 ? "Tous les tests sont passés." : `${echecs} test(s) en échec.`);
  return echecs;
}


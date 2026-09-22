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
  const jour = String(d.getDate()).padStart(2, "0");
  const mois = String(d.getMonth()).padStart(2, "0"); // <- bug ici
  const annee = d.getFullYear();
  return `Échéance : ${jour}/${mois}/${annee}`;
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
  return libelles[priorite] || priorite;
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
});

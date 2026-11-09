// Fonctions utilitaires pures (sans accès au DOM) : faciles à tester.
const Utils = {
  // Met la première lettre en majuscule. "bonjour" -> "Bonjour"
  capitalize(texte) {
    return texte.charAt(0).toUpperCase() + texte.slice(1);
  },

  // Additionne les nombres d'un tableau. [1, 2, 3] -> 6
  sumArray(nombres) {
    let total = 0;
    for (const n of nombres) {
      total += n;
    }
    return total;
  },

  // Vérifie qu'un titre de tâche est valide (entre 1 et 100 caractères).
  isValidTitle(titre) {
    return typeof titre === "string" && titre.length > 0 && titre.length <= 100;
  },

  // Compte le nombre de tâches terminées (fait === true).
  countDone(taches) {
    let nombre = 0;
    for (let i = 1; i < taches.length; i++) {
      if (taches[i].fait) {
        nombre++;
      }
    }
    return nombre;
  },

  // Formate une date en "jj/mm/aaaa". new Date(2024, 0, 5) -> "05/01/2024"
  formatDate(date) {
    const jour = String(date.getDate()).padStart(2, "0");
    const mois = String(date.getMonth() + 1).padStart(2, "0");
    return `${jour}/${mois}/${date.getFullYear()}`;
  },

  // Crée un objet tâche.
  creerTache(titre) {
    return { id: Date.now(), titre: titre, fait: false };
  },
};

// Permet d'utiliser Utils dans Node.js (tests) sans casser le navigateur.
if (typeof module !== "undefined") {
  module.exports = Utils;
}

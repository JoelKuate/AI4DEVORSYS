// Logique de l'interface : ajout, affichage, filtre, suppression.
const CLE_STOCKAGE = "taches";

let taches = chargerTaches();
let filtreActuel = "toutes";

const formulaire = document.getElementById("formulaire");
const champTitre = document.getElementById("champ-titre");
const message = document.getElementById("message");
const liste = document.getElementById("liste");
const compteur = document.getElementById("compteur");
const boutonVider = document.getElementById("bouton-vider");

function chargerTaches() {
  const donnees = localStorage.getItem(CLE_STOCKAGE);
  return donnees ? JSON.parse(donnees) : [];
}

function sauvegarder() {
  localStorage.setItem(CLE_STOCKAGE, JSON.stringify(taches));
}

function ajouterTache(titre) {
  if (!Utils.isValidTitle(titre)) {
    message.textContent = "Titre invalide (1 à 100 caractères).";
    return;
  }
  taches.push(Utils.creerTache(titre.trim()));
  sauvegarder();
  message.textContent = "";
  afficher();
}

function basculerTache(id) {
  taches = taches.map((t) => (t.id === id ? { ...t, fait: !t.fait } : t));
  sauvegarder();
  afficher();
}

function supprimerTache(id) {
  taches = taches.filter((t) => t.id !== id);
  sauvegarder();
  afficher();
}

function supprimerTerminees() {
  taches = taches.filter((t) => !t.fait);
  sauvegarder();
  afficher();
}

function tachesFiltrees() {
  if (filtreActuel === "a-faire") return taches.filter((t) => !t.fait);
  if (filtreActuel === "terminees") return taches.filter((t) => t.fait);
  return taches;
}

function afficher() {
  liste.innerHTML = "";

  for (const tache of tachesFiltrees()) {
    const li = document.createElement("li");
    li.className = tache.fait ? "fait" : "";

    const texte = document.createElement("span");
    texte.textContent = Utils.capitalize(tache.titre);
    texte.addEventListener("click", () => basculerTache(tache.id));

    const bouton = document.createElement("button");
    bouton.textContent = "✕";
    bouton.className = "supprimer";
    bouton.addEventListener("click", () => supprimerTache(tache.id));

    li.append(texte, bouton);
    liste.appendChild(li);
  }

  const restantes = taches.length - Utils.countDone(taches);
  compteur.textContent = `${restantes} tâche(s) restante(s)`;
}

formulaire.addEventListener("submit", (evenement) => {
  evenement.preventDefault();
  ajouterTache(champTitre.value);
  champTitre.value = "";
  champTitre.focus();
});

document.querySelectorAll(".filtres button").forEach((bouton) => {
  bouton.addEventListener("click", () => {
    filtreActuel = bouton.dataset.filtre;
    document
      .querySelectorAll(".filtres button")
      .forEach((b) => b.classList.toggle("actif", b === bouton));
    afficher();
  });
});

boutonVider.addEventListener("click", supprimerTerminees);

afficher();

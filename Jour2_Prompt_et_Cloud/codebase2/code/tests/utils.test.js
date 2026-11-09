// Tests unitaires avec le module natif de Node.js (aucune dépendance).
// Lancer depuis le dossier code/ : npm test
const test = require("node:test");
const assert = require("node:assert");
const Utils = require("../js/utils.js");

test("capitalize met la première lettre en majuscule", () => {
  assert.strictEqual(Utils.capitalize("bonjour"), "Bonjour");
});

test("capitalize accepte une chaîne vide", () => {
  assert.strictEqual(Utils.capitalize(""), "");
});

test("sumArray additionne les nombres", () => {
  assert.strictEqual(Utils.sumArray([1, 2, 3]), 6);
});

test("sumArray retourne 0 pour un tableau vide", () => {
  assert.strictEqual(Utils.sumArray([]), 0);
});

test("isValidTitle accepte un titre normal", () => {
  assert.strictEqual(Utils.isValidTitle("Acheter du pain"), true);
});

test("isValidTitle rejette un titre vide", () => {
  assert.strictEqual(Utils.isValidTitle(""), false);
});

test("isValidTitle rejette un titre composé uniquement d'espaces", () => {
  // Ce test ÉCHOUE au départ : c'est un bug volontaire pour les exercices /fix.
  assert.strictEqual(Utils.isValidTitle("     "), false);
});

test("countDone compte les tâches terminées", () => {
  // Ce test ÉCHOUE au départ : c'est un bug volontaire pour les exercices /fix.
  const taches = [
    { titre: "A", fait: true },
    { titre: "B", fait: false },
    { titre: "C", fait: true },
  ];
  assert.strictEqual(Utils.countDone(taches), 2);
});

test("formatDate formate en jj/mm/aaaa", () => {
  assert.strictEqual(Utils.formatDate(new Date(2024, 0, 5)), "05/01/2024");
});

test("creerTache crée une tâche non terminée", () => {
  const tache = Utils.creerTache("Test");
  assert.strictEqual(tache.titre, "Test");
  assert.strictEqual(tache.fait, false);
});

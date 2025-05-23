import { Eleve } from "./Classes/Eleve";
import { Menu } from "./Classes/Menu";
import { Plat } from "./Classes/Plat";
import { AuthService } from "./Services/AuthService";

const repas = document.querySelector("#repas");

const reservation = document.querySelector("#reservation") as HTMLFormElement;
reservation?.addEventListener("submit", (event) => {
  event.preventDefault();
  const token = localStorage.getItem("token");
  if (!token) {
    return (window.location.href = "../login.html");
  }

  const formData = new FormData(reservation);
  const heure = formData.get("heure");
  const repas = formData.get("repas");
  const lsEleve = localStorage.getItem("eleve");

  const eleve = new Eleve(String(lsEleve), "CDA");

  const plat = new Plat(String(repas), "entrée", 25);
  const dateHeure = new Date(String(heure));

  console.log("heure:", heure);
  console.log("repas:", repas);
  eleve.reservation(dateHeure, new Menu([plat]));
});

const inscription = document.querySelector("#inscription") as HTMLFormElement;
inscription?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(inscription);
  const nom = formData.get("nom");
  const classe = formData.get("classe");
  const mdp = formData.get("mdp");

  const strNom = String(nom);
  const strClasse = String(classe);
  const strMdp = String(mdp);

  const eleve = new Eleve(strNom, strClasse);

  console.log("nom:", strNom);
  console.log("classe:", strClasse);
  console.log("mdp", strMdp);

  const authService = new AuthService();
  console.log("Inscription", authService);

  const authServiceRegister = authService.register(eleve, strMdp);
  console.log("register", authServiceRegister);
});

const connexion = document.querySelector("#formConnexion") as HTMLFormElement;
connexion?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(connexion);
  const nom = formData.get("loginNom");
  const mdp = formData.get("loginMdp");

  const strNom = String(nom);
  const strMdp = String(mdp);

  console.log("loginNom:", strNom);
  console.log("loginMdp", strMdp);

  const authService = new AuthService();
  console.log("connexion", authService);

  const authServiceLogin = authService.login(strNom, strMdp);
  console.log("vous etes connecté", authServiceLogin);

  localStorage.setItem("eleve", strNom);
  localStorage.setItem("token", "connected");
  console.log(localStorage);
});

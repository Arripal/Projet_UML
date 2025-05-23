const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.get("/api/reservations/:nom", (req, res) => {
  const nom = req.params.nom;
  const file_path = path.join(__dirname, "../Reservation.json");
  const data = JSON.parse(fs.readFileSync(file_path, "utf-8"));

  const reservation = data.reservations.find(
    (reservation) => reservation.eleve.nom === nom
  );

  res
    .status(201)
    .json({ message: "Voici la réservation.", reservation: reservation });
});

app.get("/api/reservations", (req, res) => {
  const file_path = path.join(__dirname, "../Reservation.json");
  const data = JSON.parse(fs.readFileSync(file_path, "utf-8"));

  res.status(201).json({
    message: "Réservation enregistrée.",
    reservations: data.reservations,
  });
});

app.post("/api/reservations", (req, res) => {
  const reservation = req.body;
  const file_path = path.join(__dirname, "../Reservation.json");
  const data = JSON.parse(fs.readFileSync(file_path, "utf-8"));

  data.reservations.push(reservation);

  fs.writeFileSync(file_path, JSON.stringify(data, null, 2));
  res.status(201).json({ message: "Réservation enregistrée." });
});

app.put("/api/reservations/:nom/statut", (req, res) => {
  const nom = req.params.nom;
  const statut = req.body.statut;
  const file_path = path.join(__dirname, "../Reservation.json");
  const data = JSON.parse(fs.readFileSync(file_path, "utf-8"));

  const index = data.reservations.findIndex(
    (reservation) => reservation.eleve.nom === nom
  );

  data.reservations[index].statut = statut;

  fs.writeFileSync(file_path, JSON.stringify(data, null, 2));
  res.status(201).json({ message: "Réservation enregistrée." });
});

app.post("/api/plats", (req, res) => {
  const plat = req.body;
  const file_path = path.join(__dirname, "../Plat.json");
  const data = JSON.parse(fs.readFileSync(file_path, "utf-8"));

  data.plats.push(plat);

  fs.writeFileSync(file_path, JSON.stringify(data, null, 2));
  res.status(201).json({ message: "Plat enregistré." });
});

app.put("/api/plats/:nom", (req, res) => {
  const nom = req.params.nom;
  const new_plat = req.body;
  const file_path = path.join(__dirname, "../Plat.json");
  const data = JSON.parse(fs.readFileSync(file_path, "utf-8"));

  const index = data.plats.findIndex((plat) => plat.nom === nom);

  data.plats[index] = new_plat;

  fs.writeFileSync(file_path, JSON.stringify(data, null, 2));
  res.status(201).json({ message: "Plat mis à jour." });
});

app.get("/api/eleves/:nom", (req, res) => {
  const nom = req.params.nom;
  const file_path = path.join(__dirname, "../Eleve.json");
  const data = JSON.parse(fs.readFileSync(file_path, "utf-8"));

  const eleve = data.eleves.find((eleve) => eleve.nom === nom);

  res.status(201).json({ message: "Voici l'elève", eleve: eleve });
});

app.post("/api/register", (req, res) => {
  const new_eleve = req.body.eleve;
  const file_path = path.join(__dirname, "../Eleve.json");
  const data = JSON.parse(fs.readFileSync(file_path, "utf-8"));

  const eleve = data.eleves.find((eleve) => eleve.nom === new_eleve.nom);

  if (eleve) {
    return res
      .status(409)
      .json({ message: "Elève déjà enregistré.", error: true });
  }

  data.eleves.push(new_eleve);
  fs.writeFileSync(file_path, JSON.stringify(data, null, 2));

  res.status(201).json({ message: "Elève inscrit.", eleve: eleve });
});

app.post("/api/login", (req, res) => {
  const identifiants = req.body.identifiants;

  const file_path = path.join(__dirname, "../Eleve.json");
  const data = JSON.parse(fs.readFileSync(file_path, "utf-8"));

  const eleve = data.eleves.find(
    (eleve) =>
      eleve.nom === identifiants.nom && eleve.password === identifiants.password
  );

  if (!eleve) {
    return res
      .status(404)
      .json({ message: "Identifiants erronés.", error: true });
  }

  res.status(200).json({
    message: "Authentification réussie.",
    logged_in: true,
    token: "connected",
  });
});

app.post("/api/menu", (req, res) => {
  const new_menus = req.body.menu;
  const file_path = path.join(__dirname, "../Menu.json");
  const data = JSON.parse(fs.readFileSync(file_path, "utf-8"));

  data.menus.push(new_menus);
  fs.writeFileSync(file_path, JSON.stringify(data, null, 2));

  res.status(201).json({ message: "menu enregistré.", menu: menu });
});

app.get("/api/menu", (req, res) => {
  const file_path = path.join(__dirname, "../Menu.json");
  const data = JSON.parse(fs.readFileSync(file_path, "utf-8"));

  const menu = data.menus;

  res.status(201).json({ message: "Voila le menu", menu: menu });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

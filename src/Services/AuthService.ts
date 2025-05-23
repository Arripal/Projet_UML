import axios from "axios";
import { Eleve } from "../Classes/Eleve";

export class AuthService {
  async register(eleve: Eleve, password: string) {
    const response = await axios.post("http://localhost:3000/api/register", {
      eleve: {
        nom: eleve.nom,
        classe: eleve.classe,
        password: password,
      },
    });

    return response.data;
  }

  async login(nom: String, password: String) {
    const response = await axios.post("http://localhost:3000/api/login", {
      identifiants: {
        nom: nom,
        password: password,
      },
    });

    return response.data;
  }
}

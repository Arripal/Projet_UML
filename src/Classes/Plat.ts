import axios from 'axios';
import { IPlat } from '../Interfaces/IPlat';

export class Plat implements IPlat {
	nom: String;
	type: String;
	calorie: number;
	constructor(nom: String, type: String, calorie: number) {
		this.nom = nom;
		this.type = type;
		this.calorie = calorie;
	}

	async modifyPlat(nom: String, plat: Plat): Promise<any> {
		const response = await axios.put(
			`http://localhost:3000/api/plats/${nom}`,
			plat
		);

		return response.data;
	}

	async createPlat() {
		const response = await axios.post('http://localhost:3000/api/plats', {
			nom: this.nom,
			type: this.type,
			calorie: this.calorie,
		});

		return response.data;
	}
}

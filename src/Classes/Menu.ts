import { Plat } from './Plat';

export class Menu {
	liste_plats: Plat[];
	constructor(plats: Plat[]) {
		this.liste_plats = plats;
	}
}

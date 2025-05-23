import { Eleve } from './Eleve';
import { Menu } from './Menu';

export class Reservation {
	date: Date;
	menu: Menu;
	eleve: Eleve;
	statut: String;
	constructor(date: Date, menu: Menu, eleve: Eleve) {
		this.date = date;
		this.menu = menu;
		this.eleve = eleve;
		this.statut = 'En attente';
	}
}

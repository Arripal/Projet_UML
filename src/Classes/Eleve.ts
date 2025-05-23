import axios from 'axios';
import { ReservationService } from '../Services/ReservationService';
import { Menu } from './Menu';
import { Reservation } from './Reservation';

export class Eleve {
	nom: String;
	classe: String;
	service_reservation: ReservationService;
	constructor(nom: String, classe: String) {
		this.nom = nom;
		this.classe = classe;
		this.service_reservation = new ReservationService();
	}

	async reservation(date: Date, menu: Menu) {
		this.service_reservation.createReservation(
			date,
			menu,
			new Eleve(this.nom, this.classe)
		);
	}
}

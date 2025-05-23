import axios from 'axios';
import { Eleve } from '../Classes/Eleve';
import { Menu } from '../Classes/Menu';
import { Reservation } from '../Classes/Reservation';

export class ReservationService {
	reservation: Reservation;

	addTime(date: Date) {
		this.reservation.date = date;
	}

	async createReservation(date: Date, menu: Menu, eleve: Eleve) {
		const reservation = new Reservation(date, menu, eleve);
		await axios.post('http://localhost:3000/api/reservations', reservation);
	}

	async sendReservation(nom: String): Promise<any> {
		const response = await axios.get(
			`http://localhost:3000/api/reservations/${nom}`
		);
		const reservation = response.data.reservation;

		return reservation;
	}

	async validerReservation(nom: String) {
		await this.setReservationStatut(nom, 'Validée.');
	}

	async refuserReservation(nom: String) {
		await this.setReservationStatut(nom, 'Refusée.');
	}

	async setReservationStatut(nom: String, statut: String) {
		await axios.put(`http://localhost:3000/api/reservations/${nom}/statut`, {
			statut: statut,
		});
	}

	async getAllReservations() {
		const response = await axios.get('http://localhost:3000/api/reservations');
		const reservations = response.data.reservations;
		return reservations;
	}
}

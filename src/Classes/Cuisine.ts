import { ReservationService } from '../Services/ReservationService';
import { Menu } from './Menu';
import { Plat } from './Plat';

export class Cuisine {
	reservation_service: ReservationService;

	consulterReservations() {
		return this.reservation_service.getAllReservations();
	}

	async modifierPlat(nom: String, plat: Plat) {
		const response = await plat.modifyPlat(nom, plat);
		return response.data;
	}

	ajouterPlatAuMenu(menu: Menu, plat: Plat) {
		menu.liste_plats.push(plat);
		return menu;
	}

	supprimerPlatDuMenu(menu: Menu, nom: String) {
		const index = menu.liste_plats.findIndex(
			(plat_in_menu) => plat_in_menu.nom === nom
		);

		menu.liste_plats.splice(index, 1);

		return menu;
	}
}

import axios from "axios";
import { Menu } from "../Classes/Menu";
import { Plat } from "../Classes/Plat";

export class MenuService {
  menu: Menu;

  constructor(menu: Menu) {
    this.menu = menu;
  }

  addPlat(plat: Plat): Menu {
    this.menu.liste_plats.push(plat);
    return this.menu;
  }

  async displayMenu(): Promise<Menu> {
    const response = await axios.get("http://localhost:3000/api/menu");
    return response.data;
  }
}

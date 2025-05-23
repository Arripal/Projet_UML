import { Plat } from '../Classes/Plat';

export interface IPlat {
	modifyPlat(nom: String, plat: Plat): Promise<any>;
}

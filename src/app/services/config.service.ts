import { Injectable } from "@angular/core";
import { User } from "../pages/models";


@Injectable({
  providedIn: 'root'
})
export class ConfigService {
	_user!: User;
	constructor() { }

	set user(user: User) {
		this._user = user;
	}

	get user(): User {
		return this._user;
	}
}

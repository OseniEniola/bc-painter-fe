import { Injectable } from '@angular/core';
import {User} from "../models/user-data.dto";

@Injectable({
  providedIn: 'root'
})
export class UtilitesService {

  constructor() { }

  getLoggedInUserData(): User|null{
    const loginDataString = localStorage.getItem("user_date");
    const decodedLoginData = loginDataString ? JSON.parse(atob(loginDataString)) as User : null;
    return decodedLoginData;
  }
}

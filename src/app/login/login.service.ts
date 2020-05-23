import { Injectable } from '@angular/core';
import { UserI } from '../interfaces/user-i';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  validaUser(argFl: UserI, argIsValid: boolean = false): boolean {
    console.log(argFl);
    return argIsValid;
  }

  getToken(): boolean {
    return true;
  }

}

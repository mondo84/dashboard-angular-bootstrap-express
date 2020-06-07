import { Injectable } from '@angular/core';
import { UserI } from '../interfaces/user-i';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private URL_API = 'http://localhost:3000/';

  constructor(private _HTTP: HttpClient) { }

  validaUser(argFl: UserI): Observable<UserI> {
    return this._HTTP.post<UserI>(this.URL_API, argFl);
  }

  // ====== Devuelve el token creado.
  getToken(): string {
    return localStorage.getItem('token'); // Devuelve el token.
  }

}

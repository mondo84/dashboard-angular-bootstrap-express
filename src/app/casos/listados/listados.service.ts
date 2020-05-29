import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserI } from './../../interfaces/user-i';

@Injectable({
  providedIn: 'root'
})
export class ListadosService {

  // Variables de entorno.
  URL = 'http://localhost:3000/casos';
  URL_MUELLE = 'http://localhost:3000/casos/muelle';

  constructor(private http: HttpClient) { }

  getCasosRutaS(): Observable<UserI> {
    return this.http.get<UserI>(this.URL);
  }

  getCasoMuelleS(): Observable<UserI> {
    return this.http.get<UserI>(this.URL_MUELLE);
  }
}

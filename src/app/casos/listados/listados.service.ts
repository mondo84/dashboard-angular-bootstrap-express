import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserI } from './../../interfaces/user-i';
import { CasoI } from './../../interfaces/caso-i';

@Injectable({ providedIn: 'root' })
export class ListadosService {

  // Variables de entorno.
  URL = 'http://localhost:3000/casos';
  URL_MUELLE = 'http://localhost:3000/casos/muelle';
  URL_MY_CASO_OPEN = 'http://localhost:3000/casos/myCasoOpen';
  URL_CLOSE_CASO = 'http://localhost:3000/casos/myCasoClose';

  constructor(private _HTTP: HttpClient) { }

  getCasosRutaS(): Observable<UserI> {
    return this._HTTP.get<UserI>(this.URL);
  }

  getCasoMuelleS(): Observable<UserI> {
    return this._HTTP.get<UserI>(this.URL_MUELLE);
  }

  getCasoActive(): Observable<CasoI>  {
    return this._HTTP.get<CasoI>(this.URL_MY_CASO_OPEN);
  }

  closeCaso(arg: any) {
    // console.log('cierra este caso service', arg);
    return this._HTTP.post<any>(this.URL_CLOSE_CASO, arg);
  }
}

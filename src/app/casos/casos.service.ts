import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserI } from './../interfaces/user-i';

@Injectable({ providedIn: 'root' })
export class CasosService {

  private URL_CASO = 'http://localhost:3000/casos';
  private URL_VALID_CASO = 'http://localhost:3000/casos/validCaso';
  private URL_ADD_NOVEDAD = 'http://localhost:3000/casos/addNovedad';

  constructor(private _HTTP: HttpClient) { }

  saveOrUpdateCasos(objJson: UserI): Observable<any> {
    if ( objJson.id ) {
      console.log(`(servicio) Modifica este registro. ID: ${objJson.id}`);
      // return this._HTTP.post(this.URL_VALID_CASO, objJson);
    } else {
      console.log('Valida caso..');
      return this._HTTP.get(this.URL_VALID_CASO);
    }
  }

  addCaso(objJson: UserI): Observable<any> {
    console.log('Agrega caso..');
    return this._HTTP.post(this.URL_CASO, objJson);
  }

  addNovedad(objJson: UserI): Observable<any> {
    console.log(objJson);
    return this._HTTP.post(this.URL_ADD_NOVEDAD, objJson);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserI } from './../interfaces/user-i';

@Injectable({
  providedIn: 'root'
})
export class CasosService {

  constructor(private _HTTP: HttpClient) { }

  saveOrUpdateCasos(objJson: UserI) {
    const URL = 'http://localhost:3000/casos';

    if ( objJson.id ) {
      console.log(`(servicio) Modifica este registro. ID: ${objJson.id}`);
      console.log(objJson);
    } else {
      this._HTTP.post(URL, objJson)
      .subscribe({
        next: (datos) => console.log('Datos almacenados', datos)
      });  // El objeto con el encabezado se envia en el interceptor.
    }

  }

}

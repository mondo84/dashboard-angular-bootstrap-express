import { Injectable } from '@angular/core';
import { UserI } from './../interfaces/user-i';

@Injectable({
  providedIn: 'root'
})
export class CasosService {

  constructor() { }

  saveOrUpdateCasos(objJson: UserI) {
    if ( objJson.id ) {
      console.log(`(servicio) Modifica este ID: ${objJson.id}`);
      console.log(objJson);
    } else {
      console.log(`(servicio) Guarda este registro. ID: ${objJson.id}`);
      console.log(objJson);
    }
  }

}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CasosService {

  constructor() { }

  saveCasos(objJson: any) {
    console.log('Conexion con el API');
    console.log(objJson);
  }
}

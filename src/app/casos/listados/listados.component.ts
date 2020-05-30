import { ListadosService } from './listados.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserI } from 'src/app/interfaces/user-i';

@Component({
  selector: 'app-listados',
  templateUrl: './listados.component.html',
  styleUrls: ['./listados.component.scss']
})
export class ListadosComponent implements OnInit {

  getSelectedRow: UserI;
  isDeleted: number;
  numRandom1: number;
  numRandom2: number;
  numRandom3: number;
  objAddReg: number;

  constructor(private argList: ListadosService) { }

  datos: UserI;
  datosMuelle: UserI;

  ngOnInit(): void {
    this.getAllDatos();
    this.getCasoMuelle();
  }

  getAllDatos() {
    this.argList.getCasosRutaS()
    .subscribe({
      next: (datos$: any) => {
        this.datos = datos$.datos[0];
        // console.log(datos$);
      }
    });
  }

  getCasoMuelle() {
    this.argList.getCasoMuelleS()
    .subscribe({
      next: (datos$: any) => {
        this.datosMuelle = datos$.datos[0];
      }
    });
  }

  // Selecciona registro para ver y modificar.
  getRow(objJson: UserI) {
    this.numRandom1 = this.getNumeroAleatorio();
    this.getSelectedRow = objJson;
  }

  // Selecciona registro para eliminar.
  getId(objJson: UserI) {
    this.numRandom2 = this.getNumeroAleatorio();
    this.isDeleted = objJson.id;
  }

  // Selecciona registro para agregar.
  addReg() {
    this.numRandom3 = this.getNumeroAleatorio();
  }

  getNumeroAleatorio(): number {
    const momentoActual = new Date();
    const random = Math.floor(Math.random() * 100);
    const contador: number = momentoActual.getTime() + random;
    return contador;
  }
}

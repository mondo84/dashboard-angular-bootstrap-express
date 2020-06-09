import { ListadosService } from './listados.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserI } from 'src/app/interfaces/user-i';
import { map } from 'rxjs/operators';
import { CasoI } from 'src/app/interfaces/caso-i';

@Component({
  selector: 'app-listados',
  templateUrl: './listados.component.html',
  styleUrls: ['./listados.component.scss']
})
export class ListadosComponent implements OnInit {

  getSelectedRow: UserI;
  isDeleted: number;
  isClose: number;
  numRandom1: number;
  numRandom2: number;
  numRandom3: number;
  numRandom4: number;
  numRandom5: number;
  objAddReg: number;

  miCaso: CasoI;
  idCaso: number | string;

  constructor(private argList: ListadosService) { }

  datos: UserI;
  datosMuelle: UserI;

  ngOnInit(): void {
    this.getActiveCaso();
    this.getAllDatos();
    this.getCasoMuelle();
  }

  getActiveCaso(event?) {
    // console.log(event);
    // filtrado de consulta por ID almacenado en el token.
    const obs$ = this.argList.getCasoActive()
    .pipe( map((data) => data[`x`][0]) )
    .subscribe({
      next: (x: CasoI) => {
        // console.log(x);
        this.miCaso = x;
      },
      error: (e) => { console.log(e.error); },
      complete: () => { obs$.unsubscribe(); }
    });
  }

  getAllDatos() {
    const obs$ = this.argList.getCasosRutaS()
    .subscribe({
      next: (datos$: any) => {
        this.datos = datos$.datos[0];
      },
      error: (e) => { console.log(e.error); },
      complete: () => { obs$.unsubscribe(); }
    });
  }

  getCasoMuelle() {
    const obs$ = this.argList.getCasoMuelleS()
    .subscribe({
      next: (datos$: any) => {
        this.datosMuelle = datos$.datos[0];
      },
      error: (e) => { console.log(e.error); },
      complete: () => { obs$.unsubscribe(); }
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

  getSelectedMyCaso(arg: any) {
    console.log(arg.id);
    this.numRandom4 = this.getNumeroAleatorio();
    this.isClose = arg.id;
    // this.argList.closeCaso(arg);
  }

  inputNovedad(objCaso: CasoI) {
    this.numRandom5 = this.getNumeroAleatorio();
    this.idCaso = objCaso.id;
  }

  getNumeroAleatorio(): number {
    const momentoActual = new Date();
    const random = Math.floor(Math.random() * 100);
    const contador: number = momentoActual.getTime() + random;
    return contador;
  }

}

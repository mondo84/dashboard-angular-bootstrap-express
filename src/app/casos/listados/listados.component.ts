import { ListadosService } from './listados.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserI } from 'src/app/interfaces/user-i';
import { map } from 'rxjs/operators';
import { CasoI } from 'src/app/interfaces/caso-i';

// Librerias externas.
import Swal from 'sweetalert2'; // Alerts.

// ==== modal ng-bootstrap
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-listados',
  templateUrl: './listados.component.html',
  styleUrls: ['./listados.component.scss']
})
export class ListadosComponent implements OnInit {

  getSelectedRow: UserI;
  isDeleted: number;
  idCasoCompletado: number;
  numRandom1: number;
  numRandom2: number;
  numRandom3: number;
  numRandom4: number;
  numRandom5: number;
  objAddReg: number;

  closeResult = ''; // Causa del cierre del modal.

  miCaso: CasoI [] = [];
  idCaso: number | string;
  objModal: any;

  constructor(private argList: ListadosService, private modalService: NgbModal) { }

  datos: UserI [];
  datosMuelle: UserI [];
  // datos = [];
  // datosMuelle = [];
  pag = 1;
  pag2 = 1;

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
      next: (x: any) => {
        console.log(x);
        this.miCaso =  x;
      },
      error: (e) => { this.switAlertError(e.message); },
      complete: () => { obs$.unsubscribe(); }
    });
  }

  getAllDatos(event?) {
    console.log(`evento ....`);
    console.log(`Evento: ${event}`);
    const obs$ = this.argList.getCasosRutaS()
    .subscribe({
      next: async (datos$: any) => {
        console.log(datos$);
        // console.log(datos$[`status`]);
        if (datos$[`status`] === 200) {
          this.datos = await datos$.datos[0];
        } else {
          this.switAlertError('Pongase en contacto con el admin.');
        }
      },
      error: (e) => { this.switAlertError(e.message); },
      complete: () => { obs$.unsubscribe(); }
    });
  }

  getCasoMuelle() {
    const obs$ = this.argList.getCasoMuelleS()
    .subscribe({
      next: (datos$: any) => {
        this.datosMuelle = datos$.datos[0];
      },
      error: (e) => { this.switAlertError(e.message); },
      complete: () => { obs$.unsubscribe(); }
    });
  }

  // Selecciona registro para ver y modificar.
  getRow(argModal: any, objJson: UserI) {
    this.numRandom1 = this.getNumeroAleatorio();
    this.getSelectedRow = objJson;
    this.modalService.open(argModal, { size: 'sm', scrollable: false } );
  }

  // Selecciona registro para eliminar.
  modalDelete(argModal: any, objJson: UserI) {
    // console.log(`Abre modal`);
    this.modalService.open(argModal, { size: 'lg', scrollable: false });
    this.numRandom2 = this.getNumeroAleatorio();
    this.isDeleted = objJson.id;
  }

  // Selecciona registro para agregar.
  addReg(argContModalAdd: any) {
    this.numRandom3 = this.getNumeroAleatorio();
    this.modalService.open(argContModalAdd, { size: 'lg', scrollable: false } );  // sm, lg, xl
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

  openModalSm(contenido: any, objCaso: CasoI) { // Abre el modal
    this.numRandom5 = this.getNumeroAleatorio();
    this.idCaso = objCaso.id;
    this.objModal = contenido;
    this.modalService.open(contenido, { size: 'lg', scrollable: false }) // sm, lg, xl
    .result.then( (res) => {
      this.closeResult = `Cerrado con: ${res}`;
    }, (causa) => {
      this.closeResult = `Despedida ${this.getDismissReason(causa)}`;
    });
  }

  // Devuelve mensaje
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'Por presionar tecla ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'Por presionar en el fondo del modal';
    } else {
      return `con : ${reason}`;
    }
  }

  openModalCompletado(argModalC: any, argItem: any) {
    this.numRandom4 = this.getNumeroAleatorio();
    this.idCasoCompletado = argItem.id;
    this.modalService.open(argModalC, { size: 'lg', scrollable: false } );
  }

  // Modal notificacion de error.
  switAlertError( arg?: number | string ) {
    const data = JSON.stringify(arg);
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Algo anda mal!',
      text: `${data}`,
      showConfirmButton: false,
      timer: 2500
    });
  }
}

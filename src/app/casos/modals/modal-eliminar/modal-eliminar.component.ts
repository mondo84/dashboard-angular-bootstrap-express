import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

// Importacion del servicio.
import { CasosService } from './../../casos.service';

// Librerias externas.
import Swal from 'sweetalert2'; // Alerts.

@Component({
  selector: 'app-modal-eliminar',
  templateUrl: './modal-eliminar.component.html',
  styleUrls: ['./modal-eliminar.component.scss']
})
export class ModalEliminarComponent implements OnInit, OnChanges {

  @Input() idDelete: number;
  @Input() numeroRandom: number;
  @Input() objModal: any;
  @Output() aventActTab = new EventEmitter<any>();

  constructor(private argcS: CasosService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    // console.log(`Borra este id: ${this.idDelete}`);
    // console.log(this.numeroRandom);
  }

  closeModal(): void {
    this.objModal.close();
    this.eventoActualizaTablaPadre();
  }

  eliminar(argId: string | number): void {
    this.argcS.deleteEnRutaEnMuelle(argId);

    this.eventoActualizaTablaPadre();
    this.closeModal();


    setTimeout( () => {
      this.switAlertDelete();
    }, 1000);
  }

  eventoActualizaTablaPadre() {
    this.aventActTab.emit( { msj: 'Evento lanzado desde el hijo.' } );
  }

  // Modal notificador del eliminacion de ruta.
  switAlertDelete( arg?: number | string ) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Operacion exitosa!',
      text: `Registro eliminado exitosamente!`,
      showConfirmButton: false,
      timer: 2500
    });
  }
}

import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListadosService } from '../../listados/listados.service';

// Librerias externas.
import Swal from 'sweetalert2'; // Alerts.

@Component({
  selector: 'app-modal-llegada',
  templateUrl: './modal-llegada.component.html',
  styleUrls: ['./modal-llegada.component.scss']
})
export class ModalLlegadaComponent implements OnInit, OnChanges {

  @Input() numeroRandom: number; // Numero random en el input para que ejecute el ngOnChanges().
  @Input() objModalC: any;      // Objeto con el modulo del modal.
  @Input() idCaso: any;
  @Output() eventoActualizaTabla = new EventEmitter<any>(); // Actualiza tabla en el padre.
  public formllegada: FormGroup;
  toggBtnSubmit = false;

  constructor(private fb: FormBuilder, private lS: ListadosService) { }

  ngOnInit(): void {
    this.formLlegada();
    this.cargaDatosForm();
  }

  // Se ejecuta cuando hay cambios en la propiedad @Input.
  ngOnChanges(): void {
    // console.log(this.numeroRandom);
    if ( this.formllegada !== undefined) {
      this.cargaDatosForm();
    }
    this.toggBtnSubmit = false;
  }

  actualizaTabla() {
    // console.log(`genera evento`);
    this.eventoActualizaTabla.emit({ elemento: 'dato enviado desde el hijo' });
  }

  formLlegada() {
    this.formllegada = this.fb.group({
      id: [
            { value: null, disabled: false },
            { validator: [ Validators.required ] }
          ],
      confirm: [
            { value: false, disabled: false },
            { validator: [ Validators.required ] }
      ]
    });
  }

  cargaDatosForm() {
    this.formllegada.patchValue({
      id: this.idCaso,
      confirm: false
    });
  }

  onSubmit() {
    // console.log(this.formllegada.value.confirm);
    const confirm = this.formllegada.value.confirm;
    if (confirm) {
      const obs$ = this.lS.closeCaso(this.formllegada.value)
      .subscribe({
        next: async (x) => {
          // console.log(x);
          if ( x[`status`] === 200) {
            // @Output que actualiza el listado en el padre.
            await this.actualizaTabla();
            await this.closeModalComp();

            setTimeout( async () => {
              await this.switAlertCloseCaso();
            }, 1000);

          } else {
            this.switAlertError('Pongase en contacto con el admin.');
          }
        },
        error: (e) => { this.switAlertError(e.error); },
        complete: () => { /* console.log(`Completado`); */ obs$.unsubscribe(); }
      });
    }
  }

  // Habilita y deshabilita el boton del formulario.
  toggleBtn() {
    this.toggBtnSubmit = !this.toggBtnSubmit;
  }

  closeModalCompDismiss() {
    this.objModalC.dismiss();
  }

  closeModalComp() {
    this.objModalC.close();
  }

  // Modal notificador del cierre de caso.
  switAlertCloseCaso( arg?: number | string ) {
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: 'Operacion exitosa!',
      text: `El caso ha sido cerrado exitosamente!`,
      showConfirmButton: false,
      timer: 2500
    });
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

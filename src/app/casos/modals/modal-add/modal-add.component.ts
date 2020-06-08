import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { CasosService } from '../../casos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserI } from 'src/app/interfaces/user-i';

@Component({
  selector: 'app-modal-add',
  templateUrl: './modal-add.component.html',
  styleUrls: ['./modal-add.component.scss']
})
export class ModalAddComponent implements OnInit, OnChanges {

  birthday = new Date(); // April 15, 1988
  tituloModal = 'Registrar nuevo caso';
  objFormC: FormGroup;
  @Input() numRandom: number; // Numero random en el input para que ejecute el ngOnChanges().
  @Output()eventoActualizaTabla = new EventEmitter<any>();
  toogleMsg = false;
  insertedId: string;
  affectedRows: string;

  constructor(private fb: FormBuilder, private sC: CasosService) { }

  ngOnInit(): void {
    this.formCasos();
  }

  // Se ejecuta cuando hay cambios en la propiedad @Input.
  ngOnChanges(): void {
    // console.log(this.numRandom);
    if (this.objFormC !== undefined) {
      this.resetForm();
    }
  }

  formCasos() {
    this.objFormC = this.fb.group({
      placa:  [
                { value: '', disabled: false },
                { validators: [ Validators.required, Validators.minLength(2)] }
              ],
      trailer:  [
                { value: '', disabled: false },
                { validators: [ Validators.required, Validators.minLength(2)] }
              ],
      origen: [
                { value: '', disabled: false },
                { validators: [ Validators.required, Validators.minLength(2)] }
             ],
      destino: [
                { value: '', disabled: false },
                { validators: [ Validators.required, Validators.minLength(2)] }
              ]
    });
  }

  eventoActualizaTablaPadre() {
    this.eventoActualizaTabla.emit({ msj: 'Evento enviado desde el hijo.' });
  }

  // Envia formulario
  onSubmit() {
    // Devuelve todos los campos. Incluyendo los deshabilitados.
    const jsonDatos: UserI = this.objFormC.getRawValue();
    const obs$ = this.sC.saveOrUpdateCasos(jsonDatos)
    .subscribe({
      next: (x) => {
        // console.log('servicio caso: ', x[`msg`]);
        if (x[`hasCaso`]) {
          alert(`${x[`msg`]}`);
          this.resetForm();
        } else {
          const obs2$ = this.sC.addCaso(jsonDatos).subscribe({
            next: async (datos) => {
              this.toogleMsg = true;
              this.insertedId = await datos[`result`][0].insertId;
              this.affectedRows = await datos[`result`][0].affectedRows;

              this.eventoActualizaTablaPadre(); // Actualiza la tabla en el padre.

              setTimeout( () => {
                this.toogleMsg = false; // Oculta mensaje en la plantilla.
              }, 3000);
            },
            error: (er) => console.log(er.error),
            complete: () => { console.log(`completado 2`); obs2$.unsubscribe(); }
          });
        }
      },
      error: (er) => { console.log(er.error); },
      complete: () => { console.log('completado 1'); obs$.unsubscribe(); }
    });
  }

  resetForm() {
    this.objFormC.reset();
  }

  getError(controlName: string) {
    const objControl = this.objFormC.get(controlName);
    let error = '';

    switch (controlName) {
      case 'placa':
        if (objControl.invalid && ( objControl.touched || objControl.dirty )) {
          if (objControl.errors.required) {
            error = 'La placa es requerida.';
          } else if (objControl.errors.minlength) {
            error += 'La placa debe tener minimo 2 caracteres.';
          }
        }
        break;
      case 'trailer':
        if (objControl.invalid && ( objControl.touched || objControl.dirty )) {
          if (objControl.errors.required) {
            error = 'El trailer es requerido.';
          } else if (objControl.errors.minlength) {
            error += 'El trailer debe tener minimo 2 caracteres.';
          }
        }
        break;
      case 'origen':
        if (objControl.invalid && ( objControl.touched || objControl.dirty )) {
          if (objControl.errors.required) {
            error = 'El origen es requerido.';
          } else if (objControl.errors.minlength) {
            error += 'El origen debe tener minimo 2 caracteres.';
          }
        }
        break;
      case 'destino':
        if (objControl.invalid && ( objControl.touched || objControl.dirty )) {
          if (objControl.errors.required) {
            error = 'El destino es requerido.';
          } else if (objControl.errors.minlength) {
            error += 'El  destino debe tener minimo 2 caracteres.';
          }
        }
        break;
  }

    return error;
  }

  getValid(controlName: string): string {
    const objControl = this.objFormC.get(controlName);

    if (objControl.valid && ( objControl.touched || objControl.dirty )) {
      return 'Campo validado';
    }
  }

}

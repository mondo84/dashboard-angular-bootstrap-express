import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { UserI } from 'src/app/interfaces/user-i';
import { CasosService } from '../../casos.service';

@Component({
  selector: 'app-modal-save-update',
  templateUrl: './modal-save-update.component.html',
  styleUrls: ['./modal-save-update.component.scss']
})
export class ModalSaveUpdateComponent implements OnInit, OnChanges {

  objFormC: FormGroup;
  objCheck = false;
  toggleIf: boolean;
  @Input() catchGetSelectedRow: UserI;
  @Input() numeroRandom: number;

  constructor(private fb: FormBuilder, private sC: CasosService) { }

  ngOnInit(): void {
    this.formCasos();
  }

  // Detecta cambios en la propiedad @input. y ejecuta el bloque.
  ngOnChanges(): void {
    this.cargaForm();
  }

  cargaForm() {
    // console.log('carga el formulario');

    try {
      const idUsu = this.catchGetSelectedRow.id;
      if ( idUsu ) {
        this.objFormC.patchValue({
          id: this.catchGetSelectedRow.id,
          conductor: this.catchGetSelectedRow.nombre,
          cedula: this.catchGetSelectedRow.cedula,
          celular: this.catchGetSelectedRow.celular,
          placa: this.catchGetSelectedRow.placa,
          trailer: this.catchGetSelectedRow.trailer,
          origen: this.catchGetSelectedRow.origen,
          destino: this.catchGetSelectedRow.destino
        });
      }
    } catch (error) {
      // console.log('Error.......');
    }

  }

  formCasos() {
    this.objFormC = this.fb.group({
      id: [
            { value: '', disabled: false }
          ],
      conductor: [
                  { value: '', disabled: false },
                  { validators: [ Validators.required, Validators.minLength(2) ] }
                ],
      cedula: [
                { value: '', disabled: false },
                { validators: [ Validators.required, Validators.minLength(2) ] }
              ],
      celular: [
                { value: '', disabled: false },
                { validators: [ Validators.required, Validators.minLength(2) ] }
              ],
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
              ],
      check: [{ value: '', checked: true }]
    });
  }

  // Envia formulario
  onSubmit() {
    // Devuelve todos los campos. Incluyendo los deshabilitados.
    const jsonDatos: UserI = this.objFormC.getRawValue();
    this.sC.saveOrUpdateCasos(jsonDatos);
  }

  resetForm() {
    console.log('Formulario reseteado');
    this.objCheck = false;
    this.objFormC.reset();
  }

  // Habilita / deshabilita controles del form.
  isChecked() {
    this.objCheck = !this.objCheck;
  }

  getError(controlName: string) {
    const objControl = this.objFormC.get(controlName);
    let error = '';

    switch (controlName) {
      case 'conductor':
          if (objControl.invalid && ( objControl.touched || objControl.dirty )) {
            if (objControl.errors.required) {
              error = 'El nombre es requerido.';
            } else if (objControl.errors.minlength) {
              error += 'El nombre debe tener minimo 2 caracteres.';
            } // else if (objControl.errors.maxlength) {
            //   error += 'El nombre puede tener maximo 30 caracteres.';
            // }
          }
          break;
      case 'cedula':
        if (objControl.invalid && ( objControl.touched || objControl.dirty )) {
          if (objControl.errors.required) {
            error = 'La cedula es requerida.';
          } else if (objControl.errors.minlength) {
            error += 'La cedula debe tener minimo 2 caracteres.';
          }
        }
        break;
      case 'celular':
        if (objControl.invalid && ( objControl.touched || objControl.dirty )) {
          if (objControl.errors.required) {
            error = 'El celular es requerido.';
          } else if (objControl.errors.minlength) {
            error += 'El celular debe tener minimo 2 caracteres.';
          }
        }
        break;
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

  limpiaInput() {
    console.log('Lipia los campos');
    this.catchGetSelectedRow = null;
  }
}

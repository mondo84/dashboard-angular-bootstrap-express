import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CasosService } from '../../casos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserI } from 'src/app/interfaces/user-i';

@Component({
  selector: 'app-modal-add',
  templateUrl: './modal-add.component.html',
  styleUrls: ['./modal-add.component.scss']
})
export class ModalAddComponent implements OnInit, OnChanges {

  objFormC: FormGroup;
  @Input() numRandom: number; // Numero random en el input para que ejecute el ngOnChanges().

  constructor(private fb: FormBuilder, private sC: CasosService) { }

  ngOnInit(): void {
    this.formCasos();
  }

  // Se ejecuta cuando hay cambios en la propiedad @Input.
  ngOnChanges(): void {
    console.log(this.numRandom);
    this.resetForm();
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
    try {
      // console.log('Formulario reseteado add');
      this.objFormC.reset();
    } catch (error) {
    }
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

}

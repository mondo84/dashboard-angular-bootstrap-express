import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators, FormGroup } from '@angular/forms'; // Objeto de formulario
import { CasosService } from './casos.service';

@Component({
  selector: 'app-casos',
  templateUrl: './casos.component.html',
  styleUrls: ['./casos.component.scss']
})
export class CasosComponent implements OnInit {

  datos = [
            {
              foto: '../../assets/img/users/1-mujer.jpg',
              nombre: 'Erika k.',
              origen: 'Mocarí / Monteria',
              placa: 'cbx-12 de B/quilla.',
              destino: 'Planta Malambo / Barranquilla'
            },
            {
              foto: '../../assets/img/users/3mujer.jpg',
              nombre: 'Ivana M.',
              origen: 'Mocarí / Monteria',
              placa: 'cbx-12 de B/quilla.',
              destino: 'Planta Malambo / Barranquilla'
            },
            {
              foto: '../../assets/img/users/4mujer.jpg',
              nombre: 'Ivana M.',
              origen: 'Mocarí / Monteria',
              placa: 'cbx-12 de B/quilla.',
              destino: 'Planta Malambo / Barranquilla'
            },
            {
              foto: '../../assets/img/users/5mujer.jpg',
              nombre: 'Ivana M.',
              origen: 'Mocarí / Monteria',
              placa: 'cbx-12 de B/quilla.',
              destino: 'Planta Malambo / Barranquilla'
            }
          ];

  objFormC: FormGroup;
  objCheck = true;

  constructor(private fb: FormBuilder,
              private sC: CasosService) { }

  ngOnInit(): void {
    this.formCasos();
  }

  formCasos() {
    this.objFormC = this.fb.group({
      id: [
            { value: '12', disabled: false }, Validators.required
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
      check: [{ value: false, disabled: false }]
    });
  }

  // Envia formulario
  onSubmit() {
    // Devuelve todos los campos. Incluyendo los deshabilitados.
    const jsonDatos = this.objFormC.getRawValue();

    this.sC.saveCasos(jsonDatos);
  }

  // Habilita / deshabilita controles del form.
  isChecked() {
    this.objCheck = !this.objCheck;
  }
}

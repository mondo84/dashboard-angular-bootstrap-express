import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListadosService } from '../../listados/listados.service';

@Component({
  selector: 'app-modal-llegada',
  templateUrl: './modal-llegada.component.html',
  styleUrls: ['./modal-llegada.component.scss']
})
export class ModalLlegadaComponent implements OnInit, OnChanges {

  @Input() numeroRandom: number; // Numero random en el input para que ejecute el ngOnChanges().
  @Input() casoClose: any; // Numero random en el input para que ejecute el ngOnChanges().
  @Output() eventoActualizaTabla = new EventEmitter<any>();
  public formllegada: FormGroup;
  toggBtnSubmit = false;

  constructor(private fb: FormBuilder, private lS: ListadosService) { }

  ngOnInit(): void {
    this.formLlegada();
    this.cargaDatosForm();
  }

  // Se ejecuta cuando hay cambios en la propiedad @Input.
  ngOnChanges(): void {
    console.log(this.numeroRandom);
    this.cargaDatosForm();
    this.toggBtnSubmit = false;
  }

  actualizaTabla() {
    console.log(`genera evento`);
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
    if ( this.formllegada !== undefined) {
      this.formllegada.patchValue({
        id: this.casoClose,
        confirm: false
      });
    }
  }

  onSubmit() {
    // console.log(this.formllegada.value.confirm);
    const confirm = this.formllegada.value.confirm;
    if (confirm) {
      this.lS.closeCaso(this.formllegada.value)
      .subscribe({
        next: (x) => {
          // console.log(x);
          // @Output que actualiza el listado en el padre.
          this.actualizaTabla();
        },
        error: (e) => { console.error(e.error); },
        complete: () => { console.log(`Completado`); }
      });
    }
  }

  toggleBtn() {
    this.toggBtnSubmit = !this.toggBtnSubmit;
  }
}

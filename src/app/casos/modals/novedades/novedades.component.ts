import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CasosService } from '../../casos.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.scss']
})
export class NovedadesComponent implements OnInit, OnChanges {

  @Input() idCasoNov: number | string;
  @Input() numeroRandom: number;
  toggleMsg = false;
  insertedId: number;
  objFormNov: FormGroup;
  datos = [];

  constructor(private fb: FormBuilder, private cS: CasosService) { }

  ngOnInit(): void {
    this.formNovedades();
    this.loadList();
  }

  ngOnChanges(): void {
    if (this.objFormNov !== undefined) {
      this.resetForm();
    }
    this.loadList();
  }

  formNovedades() {
    this.objFormNov = this.fb.group({
      idCaso: [null, { validators: [ Validators.required ] }],
      motor: [false],
      llanta: [false],
      acpm: [false],
      descripcion: [
        { value: '', disabled: false },
        { validators: [Validators.required, Validators.minLength(5), Validators.maxLength(250)]
      }]
    });
  }

  resetForm(): void {
    // Resetea el formulario y asigna valores.
    this.objFormNov.reset({
      idCaso: this.idCasoNov,
      motor: false,
      llanta: false,
      acpm: false,
      descripcion: ''
    });
  }

  onSubmit() {
    // console.log(this.objFormNov.getRawValue());
    const obs$ = this.cS.addNovedad(this.objFormNov.getRawValue())
    .pipe( map(x => x[`result`][0] ) )
    .subscribe({
      next: (x) => {
        const statusServer = x[`serverStatus`];
        const afectedRows = x[`affectedRows`];
        if ( statusServer === 2 && afectedRows === 1 ) {

          this.toggleMsg = true;
          this.insertedId = x[`insertId`];
          setTimeout(() => {
            this.toggleMsg = false;
            this.insertedId = 0;
          }, 3000);
        }
      },
      error: (e) => e.error,
      complete: () => { console.log(`Completado`); obs$.unsubscribe(); }
    });
  }

  loadList() {
    console.log(`ID Caso: ${this.idCasoNov}`);

    if ( this.idCasoNov !== undefined ) {
      // Llamado al service
      const obs$ = this.cS.getMyNovedad(this.idCasoNov)
      .pipe( map(x => x[`datos`][0]) )
      .subscribe({
        next: (x) => {
          console.log(x);
          // pendiente filtrar consulta por caso abierto en el back
          this.datos = x;
        },
        error: (e) => {
          console.error(e.error);
        },
        complete: () => { console.log(`Completado`); obs$.unsubscribe(); }
      });
    }

  }

}

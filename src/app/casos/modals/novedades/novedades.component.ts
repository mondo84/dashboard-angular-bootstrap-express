import { map } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CasosService } from '../../casos.service';

@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.scss']
})
export class NovedadesComponent implements OnInit, OnChanges {

  @Input() numeroRandom: number;
  toggleMsg = false;
  insertedId: number;
  objFormNov: FormGroup;
  constructor(private fb: FormBuilder, private cS: CasosService) { }

  ngOnInit(): void {
    this.formNovedades();
  }

  ngOnChanges(): void {
    if (this.objFormNov !== undefined) {
      this.resetForm();
    }
  }

  formNovedades() {
    this.objFormNov = this.fb.group({
      motor: [false],
      llanta: [false],
      acpm: [false],
      descripcion: [
        { value: '', disabled: false },
        { validator: [Validators.required, Validators.minLength(2)]
      }]
    });
  }

  resetForm(): void {
    // Resetea el formulario y asigna valores.
    this.objFormNov.reset({
      motor: false,
      llanta: false,
      acpm: false
    });
  }

  onSubmit() {
    // console.log(this.objFormNov.value);
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

}

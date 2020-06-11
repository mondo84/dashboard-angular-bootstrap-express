import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CasosService } from '../../casos.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.scss']
})
export class NovedadesComponent implements OnInit, OnChanges {

  @ViewChild('modalnovedades', {static: true}) modalnovedades: ElementRef;
  @ViewChild('btncancel', {static: true}) btncancel: ElementRef;
  @Input() idCasoNov: number | string;
  @Input() numeroRandom: number;
  toggleMsg = false;
  insertedId: number;
  objFormNov: FormGroup;
  datos = [];
  pagina = 1;

  constructor(private fb: FormBuilder,
              private cS: CasosService,
              private rt: Router,
              private r2: Renderer2) { }

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
          this.loadList();

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
          this.datos = x;
        },
        error: async (e) => {
          console.error(e.error);
          // console.error(e.error.msj);
          switch ( e.error.msj ) {
            case 'Forbidden':
              localStorage.clear();  // Eliminamos todos los datos del local storage.
              // (pendiente por instrucciones) Cerrar el modal.
              await this.rt.navigate(['login', 84]);  // Redireccionamos al login.
              break;
            default:
              // redireccionamiento al login.
              this.rt.navigate(['login', 100]);
              break;
          }
        },
        complete: () => { console.log(`Completado`); obs$.unsubscribe(); }
      });
    }

  }

  closeModal() {
    console.log(`Cierra y despues redirecciona`);
    // this.modalnovedades.nativeElement;
    /* this.r2.removeStyle(this.modalnovedades.nativeElement, 'display');/*
    this.r2.setStyle(this.modalnovedades.nativeElement, 'background-color', 'red');*/
  }

}

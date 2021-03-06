import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CasosService } from '../../casos.service';
import { map, delay, finalize } from 'rxjs/operators';

// Librerias externas.
import Swal from 'sweetalert2';                   // Alerts.
import { NgxSpinnerService } from 'ngx-spinner';  // Spinner.

// ==== modal ng-bootstrap
import { NgbModal, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.scss']
})
export class NovedadesComponent implements OnInit, OnChanges {

  @Input() idCasoNov: number | string;
  @Input() numeroRandom: number;
  @Input() objModa: any;  // Objeto del modal del padre.
  toggleMsg = false;

  objModUpdate: any;
  insertedId: number;
  objFormNov: FormGroup;
  objFormNovMod: FormGroup;
  affectedRows: number;
  serverStatus: number;
  datos = [];
  pagina = 1;

  constructor(private fb: FormBuilder,
              private cS: CasosService,
              private rt: Router,
              private spinner: NgxSpinnerService,
              public modalService: NgbModal) {

  }

  ngOnInit(): void {
    this.formNovedades();
    this.formModNovedades();
    this.loadList();
    this.cargaFormNov();
  }

  ngOnChanges(): void {
    // console.log(this.objFormNov);
    this.spinner.show();
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

  formModNovedades() {
    this.objFormNovMod = this.fb.group({
      idNovedad: [null, { validators: [ Validators.required ] }],
      motor: [false],
      llanta: [false],
      acpm: [false],
      descripcion: [
        { value: '', disabled: false },
        { validators: [Validators.required, Validators.minLength(5), Validators.maxLength(250)]
      }]
    });
  }

  cargaFormNov() {
    this.objFormNov.patchValue({
      idCaso: this.idCasoNov,
      motor: false,
      llanta: false,
      acpm: false,
      descripcion: ''
    });
  }

  resetForm(): void {
    console.log(`reset...`);
    console.log(this.idCasoNov);
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

          const insertedId = x[`insertId`];
          this.switAlertSave(insertedId);

        }
      },
      error: (e) => e.error,
      complete: () => { console.log(`Completado`); obs$.unsubscribe(); }
    });
  }

  saveMod() {
    console.log(this.objFormNovMod.getRawValue());
    const obs$ = this.cS.updateNovS(this.objFormNovMod.getRawValue())
    // .pipe( map(x => x ) )
    .subscribe({
      next: (res) => {
        // console.log(res);
        this.loadList();
        this.switAlertUpdate();
      },
      error: (err) => console.error(`Algo anda mal: ${err.message}`),
      complete: () => { console.log(`completado`); obs$.unsubscribe(); }
    });
  }

  loadList() {
    // console.log(`ID Caso: ${this.idCasoNov}`);

    if ( this.idCasoNov !== undefined ) {
      // Llamado al service
      const obs$ = this.cS.getMyNovedad(this.idCasoNov)
      .pipe(
        map( (x) => x[`datos`][0]),
      )
      .subscribe({
        next: async (x) => {
          // Si hay datos en la coleccion entonces oculta el spinner.
          if ( x[`length`] > 0 ) {      // if ( x ) {
            this.datos = x;             // Setea el array con los datos.
            await this.spinner.hide();  // Oculta el spinner.
          } else {
            this.datos = [];            // Devuelve array vacio
            await this.spinner.hide();  // Oculta el spinner.
          }
        },
        error: async (e) => {
          switch ( e.error.msj ) {
            case 'Forbidden':
              await localStorage.clear();   // Eliminamos todos los datos del local storage.
              await this.closeModalNovedades();      // Cerrar el modal.
              await this.rt.navigate(['login', 84]);  // Redireccionamos al login.
              break;
            default:
              await localStorage.clear();   // Eliminamos todos los datos del local storage.
              await this.closeModalNovedades();      // Cerrar el modal.
              await this.rt.navigate(['login', 100]);   // redireccionamiento al login.
              break;
          }
        },
        complete: () => { /* console.log(`Completado 1`); */ obs$.unsubscribe(); }
      });
    }

  }

  closeModalDismiss() {
    this.objModa.dismiss(`click en boton X`);
  }

  closeModalNovedades() {
    // console.log(`Cierra y despues redirecciona`);
    this.objModa.close(`click en cancelar`);
  }

  openModUpdate(argModalUpdate: any, argItem: any) {
    // console.log(argItem);
    // this.objModUpdate = argItem;
    this.modalService.open(argModalUpdate, { size: 'lg' } );  // sm, lg, xl
    this.objFormNovMod.patchValue({
      idNovedad: argItem.id,
      motor: argItem.motor,
      llanta: argItem.llanta,
      acpm: argItem.acpm,
      descripcion: argItem.descripcion
    });
  }

  closeModalUpdate(argModal: any) {
    argModal.close();
  }

  updateNov(arg: any) {
    // console.log(arg);
    this.cS.updateNovS(arg);
  }

  deleteNov(arg: any) {
    // console.log(arg.id);
    const obs$ = this.cS.deleteNovS(arg.id)
    .pipe( map( (x) => x[`result`][0]  ) )
    .subscribe({
      next: async (x) => {
        console.log(x);
        const afectedRows = x[`affectedRows`];
        const statusServer = x[`serverStatus`];

        if ( statusServer === 2 ) {
          this.loadList();
          this.switAlertTimer();
        }
      },
      error: (e) => {
        console.log(e.message);
      },
      complete: () => { console.log(`Completado...`); obs$.unsubscribe(); }
    });
  }

  // Modal guardar novedad.
  switAlertSave( argId: number | string ) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Operacion exitosa!',
      text: `Novedad N°: ${argId}`,
      showConfirmButton: false,
      timer: 2500
    });
  }

  // Modal confirmacion borrado novedad.
  sweetAlertConfirm(argItem: any) {
    Swal.fire({
      title: 'Estas seguro?',
      text: `Esta operacion no se podra revertir! ID ${argItem.id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.deleteNov(argItem);
      }
    });
  }

  // Notifica borrado exitoso novedad.
  switAlertTimer() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      width: '280px',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    Toast.fire({
      icon: 'success',
      title: 'Registro borrado!'
    });
  }

  // Modal de modificar novedad.
  switAlertUpdate( argNovedad?: number | string ) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Operacion exitosa!',
      text: `Registro modificado exitosamente`,
      showConfirmButton: false,
      timer: 2500
    });
  }
}

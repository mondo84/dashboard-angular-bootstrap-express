import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms'; // Modulo de formulario.
import { CasosRoutingModule } from './casos-routing.module';  // Modulo de rutas.

// Componentes
import { CasosComponent } from './casos.component';
import { ModalLlegadaComponent } from './modals/modal-llegada/modal-llegada.component';
import { NovedadesComponent } from './modals/novedades/novedades.component';
import { ModalAddComponent } from './modals/modal-add/modal-add.component';


@NgModule({
  declarations: [
    CasosComponent,
    ModalLlegadaComponent,
    NovedadesComponent,
    ModalAddComponent
  ],
  imports: [
    CommonModule,
    CasosRoutingModule,
    ReactiveFormsModule
  ]
})
export class CasosModule { }

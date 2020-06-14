import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { ListadosRoutingModule } from './listados-routing.module';

import { ListadosComponent } from './listados.component';
import { ModalSaveUpdateComponent } from '../modals/modal-save-update/modal-save-update.component';
import { ModalEliminarComponent } from './../modals/modal-eliminar/modal-eliminar.component';
import { ModalAddComponent } from '../modals/modal-add/modal-add.component';
import { ModalLlegadaComponent } from '../modals/modal-llegada/modal-llegada.component';
import { NovedadesComponent } from '../modals/novedades/novedades.component';

// Importa el modulo de la libreria spinner.
import { NgxSpinnerModule } from 'ngx-spinner';

// External...
// ngSpinner
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    ListadosComponent,
    ModalSaveUpdateComponent,
    ModalEliminarComponent,
    ModalAddComponent,
    ModalLlegadaComponent,
    NovedadesComponent
  ],
  imports: [
    CommonModule,
    ListadosRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxSpinnerModule
  ]
})
export class ListadosModule { }

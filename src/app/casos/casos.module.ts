import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms'; // Modulo de formulario.
import { CasosRoutingModule } from './casos-routing.module';  // Modulo de rutas.

// Componentes
import { CasosComponent } from './casos.component';


@NgModule({
  declarations: [CasosComponent],
  imports: [
    CommonModule,
    CasosRoutingModule,
    ReactiveFormsModule
  ]
})
export class CasosModule { }

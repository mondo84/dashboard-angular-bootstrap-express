import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms'; // Modulo de formulario.
import { CasosRoutingModule } from './casos-routing.module';  // Modulo de rutas.

// Componentes
import { CasosComponent } from './casos.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    CasosComponent
  ],
  imports: [
    CommonModule,
    CasosRoutingModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class CasosModule { }

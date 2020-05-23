import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CasosRoutingModule } from './casos-routing.module';
import { CasosComponent } from './casos.component';


@NgModule({
  declarations: [CasosComponent],
  imports: [
    CommonModule,
    CasosRoutingModule
  ]
})
export class CasosModule { }

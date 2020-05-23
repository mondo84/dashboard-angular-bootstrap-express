import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';  // Modulo de rutas.
// import { ReactiveFormsModule } from '@angular/forms';     // Modulo de formulario.
import { AppComponent } from './app.component';           // Componente principal.


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

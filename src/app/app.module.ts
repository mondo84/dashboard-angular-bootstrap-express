import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';  // Modulo de rutas.
// import { ReactiveFormsModule } from '@angular/forms';     // Modulo de formulario.
import { AppComponent } from './app.component';           // Componente principal.
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './interceptor/interceptor.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxSpinnerModule } from 'ngx-spinner';         // Importa el modulo de la libreria spinner.

// Bootstrap optimizado para angular (no requiere jquery, ni popper).
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    NgxSpinnerModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

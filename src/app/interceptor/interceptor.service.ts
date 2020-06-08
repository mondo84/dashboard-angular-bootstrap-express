import { LoginService } from './../login/login.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class InterceptorService implements HttpInterceptor {

  constructor(private argLs: LoginService, private objRuta: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log(`Paso por el interceptor`);
    const token = this.argLs.getToken();  // Recupera token.
    let objHeaders = req.headers;         // Recupera encabezado de la peticion.

    // console.log('Paso por el interceptor');
    // Anexa los encabezados solo si existe un token.
    if (token) {
      objHeaders = objHeaders.append('Authorization', `Bearer ${token}`); // Agrega encabezado con el token.
      objHeaders = objHeaders.append('Content-Type', 'application/json'); // Agrega encabezado con el formato de dato.
    }

    const reqClone = req.clone({ headers: objHeaders });  // Clona la request y anexa el encabezado nuevo.

    return next.handle(reqClone).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo de errores del service. Maneja los errores de todas las peticiones http.
  private handleError(error: HttpErrorResponse) {

    if (error.error instanceof ErrorEvent) {
      // Se produjo un error del lado del cliente o de la red.
      console.error('Ha ocurrido un error:', error.error.message);
      localStorage.removeItem('token');
    } else {
      // console.error('Backend retona codigo: ' + error.status );
      // console.error('Respuesta del body: ' + error.message );
      switch ( error.status ) {
        case 403:
          localStorage.removeItem('token');
          break;
      }
    }

    // Retorna un observable con una respuesta al usuario.
    return throwError( error );
  }
}

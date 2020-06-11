import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, observable } from 'rxjs';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // Inyeccion del servicio de autenticacion de usuario.
  constructor(private router: Router, private argLogin: LoginService) {
  }

  // Devuelve boolean para dar acceso a la ruta o no.
  canActivate( next: ActivatedRouteSnapshot,
               state: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // console.log('Paso por el gurard');
    // Desde el interceptor, debemos enviar el token para comparar con el back.

    const hasToken = this.argLogin.getToken();
    if (hasToken) {
      return true;  // Concede acceso a la ruta.
    } else {
      this.router.navigate(['login']);
      return false; // Denega acceso a la ruta.
    }
  }

}

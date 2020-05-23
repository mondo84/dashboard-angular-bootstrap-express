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
  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('Paso por el gurard');

    /* observable con un map.
    observable.pipe(
      if (noValid) {
        this.router.navigate(['login']);
        return false;
      } else {
        return true;
      }
    );*/
    const hasToken = this.argLogin.getToken();
    if (!hasToken) {
      this.router.navigate(['login']);
      return false;
    } else {
      return true;
    }
  }

}

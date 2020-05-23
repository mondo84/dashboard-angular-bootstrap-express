import { CasosComponent } from './../casos/casos.component';
import { async } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

// array de rutas del componente. contiene rutas hijas o anidadas.
const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'casos', pathMatch: 'full' },
      {
        path: 'casos', loadChildren: async () => {
          const objCasos = await import('./../casos/casos.module');
          return objCasos.CasosModule;
        }
      },
      {
        path: 'contact', loadChildren: async () => {
          const objMC = await import('./../contact/contact.module');
          return objMC.ContactModule;
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

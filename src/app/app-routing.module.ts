import { NgModule } from '@angular/core';

import { AuthGuard } from './guards/auth.guard';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login', loadChildren: async () => {
      const lM = await import('./login/login.module');
      return lM.LoginModule;
    }
  },
  {
    path: 'home', loadChildren: async () => {
      const hM = await import ('./home/home.module');
      return hM.HomeModule;
    }
    , canActivate: [AuthGuard]  // Guard que protege la ruta si no hay token.
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

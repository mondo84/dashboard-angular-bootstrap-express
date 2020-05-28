import { CasosComponent } from './casos.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', component: CasosComponent,
    children: [
      { path: '', redirectTo: 'listado', pathMatch: 'full' },
      { path: 'listado', loadChildren: async () => {
        const objML = await import('./listados/listados.module');
        return objML.ListadosModule;
      } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CasosRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';


export const routes: Routes = [
  { 
    path: '', 
    component: FullLayoutComponent, // Usamos un layout con header/nav
    children: [
      { path: '', component: MainComponent }
    ]
  },
  { path: 'estadisticas', component: EstadisticasComponent } // Página sin header/nav
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

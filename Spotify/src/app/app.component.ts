import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { MainComponent } from './main/main.component';
import { CancionComponent } from './cancion/cancion.component';
import { CommonModule } from '@angular/common';
import { ReproductorComponent } from './reproductor/reproductor.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';





@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}

import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { MainComponent } from './main/main.component';
import { CancionComponent } from './cancion/cancion.component';
import { CommonModule } from '@angular/common';
import { ReproductorComponent } from './reproductor/reproductor.component';




@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, NavComponent, MainComponent, CancionComponent, CommonModule, ReproductorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild(ReproductorComponent) reproductor!: ReproductorComponent;
  cancionSeleccionada: any = null;
  audio_url: string = "";

  onSongSelected(cancion: any) {
    this.audio_url = "assets/music/" + cancion.titulo.toLowerCase().replace(/\s+/g, '_') + ".mp3";
    this.cancionSeleccionada = cancion;

    if(this.reproductor) {
      this.reproductor.play();
    }
  }
}

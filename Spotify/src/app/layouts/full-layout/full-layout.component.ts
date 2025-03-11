import { Component, ViewChild } from '@angular/core';
import { ReproductorComponent } from '../../reproductor/reproductor.component';
import { HeaderComponent } from '../../header/header.component';
import { NavComponent } from '../../nav/nav.component';
import { MainComponent } from '../../main/main.component';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-full-layout',
  imports: [ReproductorComponent, HeaderComponent, NavComponent, MainComponent, CommonModule],
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.css']
})
export class FullLayoutComponent { 
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

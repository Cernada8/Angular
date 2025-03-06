import { Component, OnInit } from '@angular/core';
import { CancionComponent } from '../cancion/cancion.component';
import { CommonModule } from '@angular/common';
import { PlaylistComponent } from '../playlist/playlist.component';



@Component({
  selector: 'app-main',
  imports: [CancionComponent, CommonModule, PlaylistComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

  canciones: any[] = []
  playlists: any[] = []

  constructor() {}

  ngOnInit() {
  fetch('http://127.0.0.1:8000/cancion/mostrarTodas').then(response => response.json()).then(data => {
    this.canciones=data;
  })
  .catch(error => console.error('Error:', error));

  fetch('http://127.0.0.1:8000/playlist/mostrarTodas').then(response => response.json()).then(data => {
    this.playlists=data;
  })
  .catch(error => console.error('Error:', error));



}
}

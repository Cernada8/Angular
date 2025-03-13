import { Component, Input, AfterViewInit, ViewChild, ElementRef, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-reproductor',
  imports: [],
  templateUrl: './reproductor.component.html',
  styleUrl: './reproductor.component.css'
})
export class ReproductorComponent implements OnInit{
  @Input() canciones!: any;
  @Input() nombreCancion!: string;
  @Input() nombreArtista!: string;
  @Input() fotoCancion!: string;
  @Input() audio_url!: string;

  likes: number=0;
  currentTrackIndex: number = -1;
  liked: boolean = false;
  @ViewChild('audio') audio!: ElementRef<HTMLAudioElement>;


  ngOnInit() {
    this.getLikes(); 
  }

  toggleLike() {
    this.liked = !this.liked;

    if (this.liked) {
      fetch(`http://localhost:8000/cancion/sumarLikes/${this.nombreCancion}`, {
        method: 'POST'
      })
        .then(response => {
        })
        .catch(error => console.error('Error actualizando like:', error));
    }
    else {
      fetch(`http://localhost:8000/cancion/restarLikes/${this.nombreCancion}`, {
        method: 'POST'
      })
        .then(response => {
        })
        .catch(error => console.error('Error actualizando like:', error));
    }

    this.getLikes();
  }

  play() {
    const audio = this.audio.nativeElement;
    audio.load();
    setTimeout(() => {

      audio.play().catch(error => console.log('Click para reproducir!'));
    }, 100);

  }

  cancionAnterior() {
    if (!this.canciones) return;

    this.currentTrackIndex = (this.currentTrackIndex - 1 + this.canciones.length) % this.canciones.length;
    this.updateCancionActual();
  }

  cancionSiguiente() {
    if (!this.canciones) return;

    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.canciones.length;
    this.updateCancionActual();
  }
  private formatAudioUrl(titulo: string): string {
    return titulo
      .toLowerCase()
      .replace(/\s+/g, '_') // Reemplazar espacios por _
  }
  private updateCancionActual() {
    const cancion = this.canciones[this.currentTrackIndex];
    const audioUrl = this.formatAudioUrl(cancion.titulo);

    this.audio_url = "assets/music/" + audioUrl + ".mp3";
    this.nombreCancion = cancion.titulo;
    this.nombreArtista = cancion.autor;
    this.fotoCancion = cancion.foto;
    this.play();
    this.getLikes(); 

  }

  private getLikes() {
    fetch(`http://localhost:8000/getLikes/${this.nombreCancion}`)
      .then(response => response.json())
      .then(data => {
        this.likes = data[0].likes;
      })
      .catch(error => console.error('Error obteniendo likes:', error));
  }


}

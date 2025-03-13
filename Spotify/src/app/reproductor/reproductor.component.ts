import { Component, Input, AfterViewInit, ViewChild, ElementRef, input } from '@angular/core';

@Component({
  selector: 'app-reproductor',
  imports: [],
  templateUrl: './reproductor.component.html',
  styleUrl: './reproductor.component.css'
})
export class ReproductorComponent {
  @Input() canciones!: any;
  @Input() nombreCancion!: string;
  @Input() nombreArtista!: string;
  @Input() fotoCancion!: string;
  @Input() audio_url!: string;

  currentTrackIndex: number = -1;

  @ViewChild('audio') audio!: ElementRef<HTMLAudioElement>;

  liked: boolean = false;

  toggleLike() {
    this.liked = !this.liked;
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

    this.audio_url = "assets/music/"+audioUrl+".mp3";
    this.nombreCancion = cancion.titulo;
    this.nombreArtista = cancion.autor;
    this.fotoCancion = cancion.foto;
    this.play();
  }


}

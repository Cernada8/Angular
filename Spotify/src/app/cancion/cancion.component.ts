import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cancion',
  templateUrl: './cancion.component.html',
  styleUrl: './cancion.component.css'
})
export class CancionComponent {
  @Input() titulo!: string;
  @Input() autor!: string;
  @Input() foto!: string;
  @Output() cancionClick = new EventEmitter<any>();

  onClick() {
    const audioUrl = this.formatAudioUrl(this.titulo);

    this.cancionClick.emit({
      titulo: this.titulo,
      autor: this.autor,
      foto: this.foto,
      audio_url: "/music/"+audioUrl+".mp3"
    });
  }

  private formatAudioUrl(titulo: string): string {
    return titulo
      .toLowerCase()
      .replace(/\s+/g, '_') // Reemplazar espacios por _
  }
}

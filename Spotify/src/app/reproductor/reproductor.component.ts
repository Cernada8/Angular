import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-reproductor',
  imports: [],
  templateUrl: './reproductor.component.html',
  styleUrl: './reproductor.component.css'
})
export class ReproductorComponent {
  @Input() nombreCancion!: string;
  @Input() nombreArtista!: string;
  @Input() fotoCancion!: string;
  @Input() audio_url!: string;

  @ViewChild('audio') audio!: ElementRef<HTMLAudioElement>;

  play() {
    const audio = this.audio.nativeElement;
    audio.load();
    setTimeout(() => {
      
      audio.play().catch(error => console.log('¡Click para reproducir!'));
      console.log('Reproduciendo...');
    }, 100);

  }
}

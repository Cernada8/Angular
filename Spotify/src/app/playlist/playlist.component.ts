import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-playlist',
  imports: [],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})
export class PlaylistComponent {
  @Input() nombre!: string;
}

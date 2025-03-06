import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-cancion',
  imports: [],
  templateUrl: './cancion.component.html',
  styleUrl: './cancion.component.css'
})
export class CancionComponent {
  @Input() titulo!: string;
  @Input() autor!: string;
  @Input() foto!: string;
}

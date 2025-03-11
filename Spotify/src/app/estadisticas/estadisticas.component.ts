import { Component, AfterViewInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements AfterViewInit {

  constructor(private http: HttpClient) { }

  ngAfterViewInit(): void {
    this.initializeLikesChart();
    this.initializeReproduccionesPlaylistChart();
    this.initializeEdadesChart();
    this.initializeReproduccionesCancionChart();
    this.initializeReproduccionesEstiloChart();
  }

  private initializeLikesChart(): void {
    this.http.get<any[]>('http://127.0.0.1:8000/manager/estadisticas/playlistLikes')
      .subscribe(data => {
        const ctx = document.getElementById('likesPlaylist') as HTMLCanvasElement;
        new Chart(ctx, this.getBarChartConfig(data, 'nombre', 'likes', 'Total Likes'));
      });
  }

  private initializeReproduccionesPlaylistChart(): void {
    this.http.get<any[]>('http://127.0.0.1:8000/manager/estadisticas/playlistReproducciones')
      .subscribe(data => {
        const ctx = document.getElementById('reproduccionesPlaylist') as HTMLCanvasElement;
        new Chart(ctx, this.getLineChartConfig(data, 'nombre', 'reproducciones', 'Total Reproducciones'));
      });
  }

  private initializeEdadesChart(): void {
    this.http.get<any[]>('http://127.0.0.1:8000/manager/estadisticas/usuarioEdad')
      .subscribe(data => {
        const ctx = document.getElementById('edades') as HTMLCanvasElement;
        new Chart(ctx, this.getPieChartConfig(data, 'rango', 'numero', 'Distribución de edades'));
      });
  }

  private initializeReproduccionesCancionChart(): void {
    this.http.get<any[]>('http://127.0.0.1:8000/manager/estadisticas/cancionesReproducciones')
      .subscribe(data => {
        const ctx = document.getElementById('reproduccionesCancion') as HTMLCanvasElement;
        new Chart(ctx, this.getLineChartConfig(data, 'titulo', 'reproducciones', 'Total Reproducciones'));
      });
  }

  private initializeReproduccionesEstiloChart(): void {
    this.http.get<any[]>('http://127.0.0.1:8000/manager/estadisticas/reproduccionesEstilo')
      .subscribe(data => {
        const ctx = document.getElementById('reproduccionesEstilo') as HTMLCanvasElement;
        new Chart(ctx, this.getDoughnutChartConfig(data, 'nombre', 'totalReproducciones', 'Reproducciones por estilo'));
      });
  }

  private getBarChartConfig(data: any[], labelKey: string, valueKey: string, label: string): any {
    return {
      type: 'bar',
      data: {
        labels: data.map(item => item[labelKey]),
        datasets: [{
          label: label,
          data: data.map(item => item[valueKey]),
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgb(0, 238, 255)',
          borderWidth: 1
        }]
      },
      options: this.getChartOptions()
    };
  }

  private getLineChartConfig(data: any[], labelKey: string, valueKey: string, label: string): any {
    return {
      type: 'line',
      data: {
        labels: data.map(item => item[labelKey]),
        datasets: [{
          label: label,
          data: data.map(item => item[valueKey]),
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgb(0, 238, 255)',
          borderWidth: 2,
          fill: true
        }]
      },
      options: this.getChartOptions()
    };
  }

  private getPieChartConfig(data: any[], labelKey: string, valueKey: string, label: string): any {
    return {
      type: 'pie',
      data: {
        labels: data.map(item => item[labelKey]),
        datasets: [{
          label: label,
          data: data.map(item => item[valueKey]),
          backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', 'rgba(0, 255, 13, 0.47)', '#9966ff'],
          borderWidth: 1
        }]
      },
      options: this.getChartOptions()
    };
  }

  private getDoughnutChartConfig(data: any[], labelKey: string, valueKey: string, label: string): any {
    return {
      type: 'doughnut',
      data: {
        labels: data.map(item => item[labelKey]),
        datasets: [{
          label: label,
          data: data.map(item => item[valueKey]),
          backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#9966ff'],
          borderWidth: 1
        }]
      },
      options: this.getChartOptions()
    };
  }

  private getChartOptions(): any {
    return {
      responsive: true,
      scales: {
        x: {
          ticks: { color: 'white' }
        },
        y: {
          beginAtZero: true,
          ticks: { color: 'white' }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: 'white',
            font: {
              size: 16,
              weight: 'bold'
            },
            padding: 20
          }
        }
      }
    };
  }
}

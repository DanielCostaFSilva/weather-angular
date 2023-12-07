import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from '../weather.service';
import { DataSharingService } from '../data-sharing.service';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.scss'],
})
export class PaginaInicialComponent {
  cidades = [
    ['Dallol', 'Fairbanks', 'London'],
    ['Recife', 'Vancouver', 'Yakutsk'],
  ];

  constructor(private router: Router,
    private weatherService: WeatherService,
    private dataSharingService: DataSharingService) {}

  buscarDetalhes(cidade: string): void {
    this.weatherService.getWeather(cidade).subscribe(response => {
      // Use o serviço de compartilhamento de dados para passar os dados do clima
      this.dataSharingService.setWeatherData(response);

      // Navegue para a próxima página
      this.router.navigate(['/detalhes', cidade]);
    });
  }
}

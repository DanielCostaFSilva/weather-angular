import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataSharingService } from '../data-sharing.service';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-detalhes-cidade',
  templateUrl: './detalhes-cidade.component.html',
  styleUrls: ['./detalhes-cidade.component.scss'],
})
export class DetalhesCidadeComponent implements OnInit {
  cidadeSelecionada: string = '';
  weatherData: any;
  forecastData: any;
  forecastDataList: any;

  timeSunset: string = '';
  timeSunrise: string = '';
  horaFormatada: string = '';

  selectedItemIndices: number[] = [0, 2, 4, 6];

  constructor(
    private route: ActivatedRoute,
    private dataSharingService: DataSharingService,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.cidadeSelecionada = this.route.snapshot.params['cidade'];

    // Use o serviço de compartilhamento de dados para obter os dados do clima
    this.dataSharingService.weatherData$.subscribe((data) => {
      this.weatherData = data;
      console.log('vidade:', this.weatherData);

      this.timeSunset = this.formatarHoraMinuto(data.sys.sunset);
      this.timeSunrise = this.formatarHoraMinuto(data.sys.sunrise);
    });

    // Obtenha previsão do tempo
    this.weatherService
      .getWeatherForecast(this.cidadeSelecionada)
      .subscribe((forecast) => {
        this.forecastData = forecast;
        this.forecastDataList = forecast.list;
        console.log('Previsão do Tempo:', this.forecastData);
        // Agora você pode processar os dados da previsão para alvorecer, manhã, tarde, noite, etc.
      });
  }

  formatarHoraMinuto(timestemp: number): string {
    const data = new Date(timestemp * 1000);

    const horas = data.getHours();
    const minutos = data.getMinutes();
    const periodo = horas >= 12 ? 'PM' : 'AM';

    // Converte para formato de 12 horas
    const horasFormatadas = horas % 12 || 12;

    // Adiciona um zero à esquerda para minutos menores que 10
    const minutosFormatados = minutos < 10 ? `0${minutos}` : minutos;
    this.horaFormatada = `${horasFormatadas}:${minutosFormatados} ${periodo}`;
    return this.horaFormatada;
  }
}

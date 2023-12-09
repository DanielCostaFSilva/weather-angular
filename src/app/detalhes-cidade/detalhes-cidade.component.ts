import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataSharingService } from '../data-sharing.service';
import { WeatherService } from '../weather.service';

interface WeatherData {
  main: { temp: number; humidity: number };
  sys: { sunset: number; sunrise: number };
  wind: { speed: number };
  weather: { description: string; icon: string }[];
}

interface ForecastData {
  list: { main: { temp: number }; weather: { icon: string }[] }[];
}

@Component({
  selector: 'app-detalhes-cidade',
  templateUrl: './detalhes-cidade.component.html',
  styleUrls: ['./detalhes-cidade.component.scss'],
})
export class DetalhesCidadeComponent implements OnInit {
  cidadeSelecionada: string = '';
  weatherData: WeatherData | undefined;
  forecastDataList: ForecastData['list'] | undefined;
  timeSunset: string = '';
  timeSunrise: string = '';
  horaFormatada: string = '';
  temp: number = 0;

  selectedItemIndices: number[] = [0, 2, 4, 6];

  constructor(
    private route: ActivatedRoute,
    private dataSharingService: DataSharingService,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.cidadeSelecionada = this.route.snapshot.params['cidade'];

    this.dataSharingService.weatherData$.subscribe((data: WeatherData) => {
      this.weatherData = data;
      this.timeSunset = this.formatarHoraMinuto(data.sys.sunset);
      this.timeSunrise = this.formatarHoraMinuto(data.sys.sunrise);
      this.temp = Math.floor(data.main.temp);
    });

    this.weatherService
      .getWeatherForecast(this.cidadeSelecionada)
      .subscribe((forecast: ForecastData) => {
        this.forecastDataList = forecast.list;
      });
  }

  formatarHoraMinuto(timestemp: number): string {
    const data = new Date(timestemp * 1000);
    const horas = data.getHours();
    const minutos = data.getMinutes();
    const periodo = horas >= 12 ? 'PM' : 'AM';
    const horasFormatadas = horas % 12 || 12;
    const minutosFormatados = minutos < 10 ? `0${minutos}` : minutos;
    this.horaFormatada = `${horasFormatadas}:${minutosFormatados} ${periodo}`;
    return this.horaFormatada;
  }

  convertToNumber(value: any): number {
    return Math.floor(value);
  }

  convertToTemperature(value: any): string {
    const convertedValue = +value;
    if (!isNaN(convertedValue)) {
      const roundedValue = convertedValue.toFixed(0);
      return `${roundedValue}°C`;
    }
    return 'Erro de conversão';
  }
}

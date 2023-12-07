import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataSharingService } from './data-sharing.service';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = '8c88e5763ece1d8e87328ed0ecc13439';

  constructor(
    private http: HttpClient,
    private dataSharingService: DataSharingService
  ) {}

  getWeather(city: string): Observable<any> {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get(apiUrl);
  }

  getWeatherForecast(city: string): Observable<any> {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get(apiUrl);
  }
}

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router'; // Adicione esta importação
import { PaginaInicialComponent } from './pagina-inicial.component';
import { WeatherService } from '../weather.service';
import { DataSharingService } from '../data-sharing.service';
import { of } from 'rxjs';

class MockWeatherService {
  getWeather(cidade: string) {
    return of(/* dados simulados */);
  }
}

class MockDataSharingService {
  setWeatherData(data: any) {}
}

describe('PaginaInicialComponent', () => {
  let component: PaginaInicialComponent;
  let fixture: ComponentFixture<PaginaInicialComponent>;
  let mockWeatherService: MockWeatherService;
  let mockRouter: Router;

  beforeEach(() => {
    mockWeatherService = new MockWeatherService();
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [PaginaInicialComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: WeatherService, useValue: mockWeatherService },
        { provide: DataSharingService, useClass: MockDataSharingService },
        { provide: Router, useValue: mockRouter },
      ],
    });

    fixture = TestBed.createComponent(PaginaInicialComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getWeather and navigate when buscarDetalhes is called', () => {
    const cidade = 'Dallol';

    spyOn(mockWeatherService, 'getWeather').and.returnValue(
      of(/* dados simulados */)
    );

    component.buscarDetalhes(cidade);

    expect(mockWeatherService.getWeather).toHaveBeenCalledWith(cidade);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/detalhes', cidade]);
  });
});

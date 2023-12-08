import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { DataSharingService } from '../data-sharing.service';
import { WeatherService } from '../weather.service';
import { DetalhesCidadeComponent } from './detalhes-cidade.component';

describe('DetalhesCidadeComponent', () => {
  let component: DetalhesCidadeComponent;
  let fixture: ComponentFixture<DetalhesCidadeComponent>;

  // Mocks para os serviços
  const activatedRouteMock = {
    snapshot: {
      params: { cidade: 'NomeDaCidade' },
    },
  };

  const dataSharingServiceMock = {
    weatherData$: of({
      /* dados simulados */
    }),
  };

  const weatherServiceMock = {
    getWeatherForecast: jasmine.createSpy('getWeatherForecast').and.returnValue(
      of({
        /* dados simulados */
      })
    ),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalhesCidadeComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: DataSharingService, useValue: dataSharingServiceMock },
        { provide: WeatherService, useValue: weatherServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalhesCidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set cidadeSelecionada from route params', () => {
    expect(component.cidadeSelecionada).toBe('NomeDaCidade');
  });

  it('should formatarHoraMinuto correctly', () => {
    const timestamp = 1609459200;
    const formattedTime = component.formatarHoraMinuto(timestamp);

    expect(formattedTime).toEqual('12:00 AM');
  });
});

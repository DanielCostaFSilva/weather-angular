import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesCidadeComponent } from './detalhes-cidade.component';

describe('DetalhesCidadeComponent', () => {
  let component: DetalhesCidadeComponent;
  let fixture: ComponentFixture<DetalhesCidadeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalhesCidadeComponent]
    });
    fixture = TestBed.createComponent(DetalhesCidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservarEnLineaComponent } from './reservar-en-linea.component';

describe('ReservarEnLineaComponent', () => {
  let component: ReservarEnLineaComponent;
  let fixture: ComponentFixture<ReservarEnLineaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservarEnLineaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservarEnLineaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

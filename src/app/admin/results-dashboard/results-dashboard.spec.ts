import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsDashboardComponent } from './results-dashboard';

describe('ResultsDashboard', () => {
  let component: ResultsDashboardComponent;
  let fixture: ComponentFixture<ResultsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

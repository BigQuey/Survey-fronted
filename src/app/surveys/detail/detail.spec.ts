import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyDetailComponent } from './detail';

describe('Detail', () => {
  let component: SurveyDetailComponent;
  let fixture: ComponentFixture<SurveyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

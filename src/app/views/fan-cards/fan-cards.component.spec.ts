import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FanCardsComponent } from './fan-cards.component';

describe('FanCardsComponent', () => {
  let component: FanCardsComponent;
  let fixture: ComponentFixture<FanCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FanCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FanCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

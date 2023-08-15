import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FanPageComponent } from './fan-page.component';

describe('FanPageComponent', () => {
  let component: FanPageComponent;
  let fixture: ComponentFixture<FanPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FanPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FanPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

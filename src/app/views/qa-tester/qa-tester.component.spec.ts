import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QaTesterComponent } from './qa-tester.component';

describe('QaTesterComponent', () => {
  let component: QaTesterComponent;
  let fixture: ComponentFixture<QaTesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QaTesterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QaTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

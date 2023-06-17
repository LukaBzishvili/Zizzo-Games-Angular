import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDeveloperComponent } from './game-developer.component';

describe('GameDeveloperComponent', () => {
  let component: GameDeveloperComponent;
  let fixture: ComponentFixture<GameDeveloperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameDeveloperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameDeveloperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

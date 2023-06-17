import { Injectable } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private appComponent: AppComponent;

  constructor() {
    this.appComponent = new AppComponent();
    // Perform any desired operations with the appComponent object
  }
}

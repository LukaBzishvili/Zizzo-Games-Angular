import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private adminUserId: string = 'EzXUUaQHUdVJwc981NuSpeeCsSJ2';

  constructor(private authService: AuthService) {}

  isAdmin(userId: string): boolean {
    return userId === this.adminUserId;
  }

  public isCurrentUserAdmin(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.authService.getUserId().then((userId) => {
        if (userId) {
          resolve(this.isAdmin(userId));
        } else {
          resolve(false);
        }
      }).catch((error) => {
        reject(error);
      });
    });
  }
}

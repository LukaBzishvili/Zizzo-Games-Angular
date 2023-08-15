import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthFormComponent } from '../views/auth-form/auth-form.component';
import Swal from 'sweetalert2';
// import { ProfileComponent } from '../views/profile/profile.component';
// import { ProfileEditComponent } from '../views/profile-edit/profile-edit.component';

@Injectable({
  providedIn: 'root'
})
export class IsAuthedGuard implements CanActivate {
  [x: string]: any;

constructor(private authService: AuthService, private router: Router) {} //, private profile: ProfileComponent, private profileEdit: ProfileEditComponent

async canActivate(): Promise<boolean> {
  const isLoggedIn = this.authService.isLoggedIn().value; // || this.profile.PFPisLoggedIn || this.profileEdit.PFPisLoggedIn

  if (!isLoggedIn) {
    this.router.navigate(['']); 
    Swal.fire('Error', 'Please log in first.', 'error');
    return false;
  }

  return isLoggedIn;
  }
}


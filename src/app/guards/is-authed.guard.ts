import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthFormComponent } from '../views/auth-form/auth-form.component';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class IsAuthedGuard implements CanActivate {
  [x: string]: any;

constructor(private authService: AuthService, private router: Router) {}

async canActivate(): Promise<boolean> {
  const isLoggedIn = this.authService.isLoggedIn().value;

  if (!isLoggedIn) {
    this.router.navigate(['']); 
    Swal.fire('Error', 'Please log in first.', 'error');
    return false;
  }

  return isLoggedIn;
  }
}


import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthFormComponent } from '../views/auth-form/auth-form.component';
import { AdminService } from '../services/admin.service';
import Swal from 'sweetalert2';

@Injectable({
providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {
constructor(private authService: AuthService, private router: Router, private AdminService: AdminService) {}

async canActivate(): Promise<boolean> {
    const isLoggedIn = this.authService.isLoggedIn().value;
    const isAdmin = await this.AdminService.isCurrentUserAdmin();

    if (!isLoggedIn || !isAdmin) {
    this.router.navigate(['']);
    // Swal.fire('Please log in first.', '', 'error');
    return false;
    }

    return isLoggedIn;
    }
}
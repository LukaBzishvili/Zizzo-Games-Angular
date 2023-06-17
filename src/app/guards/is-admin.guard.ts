import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthFormComponent } from '../views/auth-form/auth-form.component';
import { AdminService } from '../services/admin.service';

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
    alert('Please log in first.');
    return false;
    }

    return isLoggedIn;
    }
}
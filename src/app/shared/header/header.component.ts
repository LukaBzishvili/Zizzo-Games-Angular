import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean = false;
  isAdmin: boolean = false;
  isNavbarActive: boolean = false;
  isHeaderScrolled: boolean = false;

  constructor(private authService: AuthService, private adminService: AdminService) {}

  async ngOnInit() {
    this.authService.isLoggedIn().subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
  
      if (loggedIn) {
        this.adminService.isCurrentUserAdmin().then((isAdmin) => {
          this.isAdmin = isAdmin;
        });
      }
      else{
        this.isAdmin = false;
      }
    });
  
    this.addScrollEventListener();
    this.addResizeEventListener();
  }

  addScrollEventListener() {
    window.addEventListener('scroll', () => {
      this.isHeaderScrolled = window.scrollY >= 85;
    });
  }

  addResizeEventListener() {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && this.isNavbarActive) {
        this.isNavbarActive = false;
      }
    });
  }

  toggleNavbar() {
    this.isNavbarActive = !this.isNavbarActive;
  }

  logout() {
    this.authService
      .logout()
      .then(() => {
        console.log('Success');
      })
      .catch((error) => {
        console.log('Logout Error:', error);
    });
  }
}

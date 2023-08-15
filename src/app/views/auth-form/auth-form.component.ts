import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { SharedService } from 'src/shared.service';
import { AuthService } from 'src/app/services/auth.service'; 
import { trigger, state, style, animate, transition } from '@angular/animations';
import Swal from 'sweetalert2';
import { ProfileService, profileInterface } from 'src/app/services/profile.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css'], 
})
export class AuthFormComponent implements OnInit{

  constructor(private authService: AuthService, private profileService: ProfileService) { }
  
  loggedIn: boolean = false;
  alertMessage!: string;
  animationState!: string;
  emailPlaceholder: string = 'Enter email';
  showLoginButton: boolean = true;

  ngOnInit() {
    this.authService.isLoggedIn().subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
    });
  }

  toggleSignup() {
    const loginToggle = document.getElementById("login-toggle");
    const signupToggle = document.getElementById("signup-toggle");
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const passwordInput = document.getElementById("passwordInput-LI") as HTMLInputElement;
    
    if (loginToggle && signupToggle && loginForm && signupForm) {
      loginToggle.style.backgroundColor = "#fff";
      loginToggle.style.color = "#222";
      signupToggle.style.backgroundColor = "#b61cdd";
      signupToggle.style.color = "#fff";
      loginForm.style.display = "none";
      signupForm.style.display = "block";
      passwordInput.style.display = "block";
      this.clearForm(loginForm);
    }
  }

  toggleLogin() {
    const loginToggle = document.getElementById("login-toggle");  
    const signupToggle = document.getElementById("signup-toggle");
    const signupForm = document.getElementById("signup-form");
    const loginForm = document.getElementById("login-form");
    const passwordInput = document.getElementById("passwordInput-LI") as HTMLInputElement;

    if (loginToggle && signupToggle && signupForm && loginForm) {
      loginToggle.style.backgroundColor = "#b61cdd";
      loginToggle.style.color = "#fff";
      signupToggle.style.backgroundColor = "#fff";
      signupToggle.style.color = "#222";
      signupForm.style.display = "none";
      loginForm.style.display = "block"; 
      passwordInput.style.display = "block";
      this.clearForm(signupForm);
    }
  }

  clearForm(form: { querySelectorAll: (arg0: string) => any; }) {
    const inputs = form.querySelectorAll("input");
    const forgotButton = document.getElementById("forgot-btn");
    if (forgotButton) {
      forgotButton.innerHTML = 'Forgot Password?';
    }    
    inputs.forEach((input: { id: string; value: string; }) => {
      if (input.id !== "reg-btn" && input.id !== "log-btn") {
        input.value = "";
      }
      this.emailPlaceholder = 'Enter email';
      this.showLoginButton = true;
    });
  }

  loginUser() {
    const emailInput = document.getElementById("EmailInput-LI") as HTMLInputElement;
    const passwordInput = document.getElementById("passwordInput-LI") as HTMLInputElement;

    if (emailInput && passwordInput) {
      const email = emailInput.value;
      const password = passwordInput.value;
  
      this.authService.login(email, password)
        .then(() => {
          Swal.fire('Login Successful!', '', 'success');
          setTimeout(() => {
            this.alertMessage = '';
            this.animationState = '';
          }, 3000);
        })
        .catch((error) => {
          console.log('Login Error:', error);
          Swal.fire('Error', 'Incorrect email or password.', 'error');
          setTimeout(() => {
            this.alertMessage = '';
            this.animationState = '';
          }, 3000);
        });
    }
  }

//   public isTokenSaved(): boolean {
//     return !!localStorage.getItem('token');
//   }
  
//   Check(){
//     if (this.isTokenSaved()) {console.log("Success");
// } else {console.log("Error Error Error");
// }
//   }
  

  registerUser() {
    const emailInput = document.getElementById("email-SU") as HTMLInputElement;
    const passwordInput = document.getElementById("passwordInput-SU") as HTMLInputElement;
  
    if (emailInput && passwordInput) {
      const email = emailInput.value;
      const password = passwordInput.value;
      
      this.authService.register(email, password)
        .then(() => {
          Swal.fire('Registration Successful!', '', 'success');
          setTimeout(() => {
            this.alertMessage = '';
            this.animationState = '';
          }, 3000);
///////////////////////////////////////////////Adding profile for user
      this.createProfile();
              })
              .catch((error) => {
                console.log('Registration Error:', error);
                Swal.fire('Error', 'Registration failed.', 'error');
                setTimeout(() => {
                  this.alertMessage = '';
                  this.animationState = '';
                }, 3000);
              });
          }
        }
      async createProfile() {
        const ageInput = document.getElementById("age-SU") as HTMLInputElement;
        const nameInput = document.getElementById("nameInput-SU") as HTMLInputElement;
        const userID = await this.authService.getUserId(); 
        const age = Number(ageInput.value);
        if (userID) {
          const profile: profileInterface = {
            id: "", 
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png",
            name: nameInput.value, 
            age: age,
            userID: userID,
            experience: 0
          };
      this.profileService.addProfile(profile)
        .then(() => {
          console.log('Profile creation successful!');
        })
        .catch((error) => {
          console.log('Profile creation failed:', error);
        });
    } else {
      console.log('Unable to retrieve user ID');
    }
  }




  forgotPassword() {
    this.showLoginButton = false;
    const emailInput = document.getElementById("EmailInput-LI") as HTMLInputElement;
    const passwordInput = document.getElementById("passwordInput-LI") as HTMLInputElement;
    passwordInput.style.display = "none";
    const forgotButton = document.getElementById("forgot-btn");
    if (forgotButton) {
      forgotButton.innerHTML = 'Reset Password';
    }
    if (emailInput) {
      const email = emailInput.value;
      

      if (email === '') {
        this.emailPlaceholder = 'Enter email to reset password';
        return;
      }

    
      this.authService.resetPassword(email)
        .then(() => {
          Swal.fire('Password reset email sent!', '', 'success');
          console.log("Password reset email sent.");
        })
        .catch((error) => {
          Swal.fire('Password Reset Error', '', 'error');
          console.log('Password Reset Error:', error);
        });
    }
  }

  showAlertMessage(message: string, type: string) {
    this.alertMessage = message;
    this.animationState = type;
    setTimeout(() => {
      this.alertMessage = '';
      this.animationState = '';
    }, 3000);
  }
}

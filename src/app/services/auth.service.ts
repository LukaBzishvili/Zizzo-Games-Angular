import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import * as firebase from 'firebase/compat';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject: BehaviorSubject<boolean>;
  alertMessage!: string;
  animationState!: string;
  
  constructor(private afAuth: AngularFireAuth, private router: Router){
    this.loggedInSubject = new BehaviorSubject<boolean>(false);

    this.afAuth.authState.subscribe((user) => {
      this.loggedInSubject.next(!!user);
    });
  }

  public register(email: string, password: string): Promise<void> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(() => {
      })
      .catch((error) => {
        console.log('Registration Error:', error);
        throw error;
      });
  }

  public login(email: string, password: string): Promise<void> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log("Success");
        if (res.user) {
          localStorage.setItem('token', res.user.uid);
        }
      })
      .catch((error) => {
        console.log('Login Error:', error);
        throw error;
    });
  }

  public updateEmail(newEmail: string): Promise<void> {
    return this.afAuth.currentUser.then((user) => {
      if (user) {
        return user.updateEmail(newEmail);
      } else {
        throw new Error('User not logged in.');
      }
    });
  }
  
  

  // Reload page
  private logoutSubject: Subject<void> = new Subject<void>();
  
  public get logoutEvent(): Subject<void> {
    return this.logoutSubject;
  }

  public triggerLogout(): void {
    this.logoutSubject.next();
  }

  public reloadPage(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.router.url]);
    });
  }
  

  public logout(): Promise<void> {
    return this.afAuth.signOut()
      .then(() => {
        localStorage.removeItem('token');
        this.triggerLogout();
        this.reloadPage();
      })
      .catch((error) => {
        console.log('Logout Error:', error);
        throw error;
      });
  }

  public resetPassword(email: string): Promise<void> {
    return this.afAuth.sendPasswordResetEmail(email)
      .then(() => {
      })
      .catch((error) => {
        console.log('Password Reset Error:', error);
        throw error;
      });
  }

  public isLoggedIn(): BehaviorSubject<boolean> {
    return this.loggedInSubject;
  }

  public getCurrentUser(): Observable<firebase.default.User | null> {
    return this.afAuth.user;
  }

  public async getUserId(): Promise<string | null> {
    const user = await this.afAuth.currentUser;
    if (user) {
      return user.uid;
    } else {
      return null;
    }
  }

  public getCurrentUserEmail(): Promise<string | null> {
    return new Promise((resolve, reject) => {
      this.afAuth.authState.subscribe((user) => {
        if (user && user.email) {
          resolve(user.email);
        } else {
          resolve(null);
        }
      }, (error) => {
        reject(error);
      });
    });
  }  
}

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService, profileInterface } from 'src/app/services/profile.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profiles: Observable<profileInterface[]> | undefined;
  profilesCollection: AngularFirestoreCollection<profileInterface> | undefined;

  isLoading: boolean = true;
  PFPisLoggedIn!: boolean;


  userImage: string | null = null;
  userName: string | null = null;
  userEmail: string | null = null;
  userAge: number | null = null; 
  userExperience: number | null = null;
  userId: string | null = null;
  profileId: string | null = null;

  constructor(
    private authService: AuthService,
    private auth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore,
    private profileService: ProfileService,
    private storage: AngularFireStorage
  ) {
    this.profilesCollection = this.firestore.collection<profileInterface>('profiles');

    const isLoggedInSubject: BehaviorSubject<boolean> = this.authService.isLoggedIn();
    isLoggedInSubject.subscribe((isLoggedIn: boolean) => {
      this.PFPisLoggedIn = isLoggedIn;
    });
  }

  ngOnInit(): void {
    this.authService
      .getCurrentUserEmail()
      .then((email) => {
        if (email) {
          this.userEmail = email;
        } else {
          console.log('User email not found.');
        }
      })
      .catch((error) => {
        console.log('Error getting user email:', error);
      });
////////////////////////////////////////////////////////////////////Getting profile
    this.auth.user.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        this.firestore
          .collection('profiles', (ref) => ref.where('userID', '==', this.userId))
          .get()
          .toPromise()
          .then((querySnapshot) => {
            if (querySnapshot && !querySnapshot.empty) {
              const profileData = querySnapshot.docs[0].data() as profileInterface;
              this.userImage = profileData.image;
              this.userName = profileData.name;
              this.userAge = profileData.age;
              this.userExperience = profileData.experience;
              this.isLoading = false;
            } else {
              this.isLoading = false;
            }
          })
          .catch((error) => {
            console.log('Error getting profile:', error);
            this.isLoading = false;
        });
      }
    });    
  }
}
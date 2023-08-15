import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService, profileInterface } from 'src/app/services/profile.service';
import { ProfileComponent } from 'src/app/views/profile/profile.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  profiles: Observable<profileInterface[]> | undefined;
  profilesCollection: AngularFirestoreCollection<profileInterface> | undefined;
  email: string = '';
  userID: string = '';

  isLoading: boolean = true;
  PFPisLoggedIn!: boolean;

  userImage: string | null = null;
  userName: string | null = null;
  userEmail: string | null = null;
  userAge: number | null = null; 
  userExperience: string | null = null;
  userId: string | null = null;
  profileId: string | null = null;
  ageInputValue: number = 0;
  experienceInputValue: number = 0;


  @ViewChild('pfpImage') pfpImageRef!: ElementRef<HTMLImageElement>;
  @ViewChild('imageInput') imageInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('emailInput') emailInputRef!: ElementRef<HTMLInputElement>;
  


  constructor(
    private authService: AuthService, 
    private auth: AngularFireAuth, 
    private profileService: ProfileService, 
    private storage: AngularFireStorage, 
    private firestore: AngularFirestore,
  ) {
    this.profilesCollection = this.firestore.collection<profileInterface>('profiles');

    const isLoggedInSubject: BehaviorSubject<boolean> = this.authService.isLoggedIn();
    isLoggedInSubject.subscribe((isLoggedIn: boolean) => {
      this.PFPisLoggedIn = isLoggedIn;
    });
  }

  async ngOnInit(): Promise<void> {
    //////////////////////////////////// Getting Email
    this.authService.getCurrentUserEmail().then((email) => {
      if (email) {
        this.userEmail = email;
        console.log('User Email:', this.userEmail);
      } else {
        console.log('User email not found.');
      }
    }).catch((error) => {
      console.log('Error getting user email:', error);
    });

    ///////////////////////////////////Getting Profile
    this.auth.user.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        console.log('User ID:', this.userId);
        this.firestore
          .collection('profiles', (ref) => ref.where('userID', '==', this.userId))
          .get()
          .toPromise()
          .then((querySnapshot) => {
            if (querySnapshot && !querySnapshot.empty) {
              const profileData = querySnapshot.docs[0].data() as profileInterface;
              this.userName = profileData.name;
              this.userImage = profileData.image;
              this.userName = profileData.name;
              this.ageInputValue = profileData.age;
              this.experienceInputValue = profileData.experience;
              this.profileId = querySnapshot.docs[0].id;
              console.log('Profile found:', profileData);
              this.isLoading = false;
              console.log('Current user ID matches the userID from profiles.');
            } else {
              console.log('Profile not found.');
              Swal.fire('Error', 'Profile not found.', 'error');
              this.isLoading = false;
            }
          })
          .catch((error) => {
            console.log('Error getting profile:', error);
            this.isLoading = false;
        });
      }
    });
  // Age and experience guards
//   const ageInput = document.querySelector('.age') as HTMLInputElement;
//   ageInput.addEventListener('input', () => {
//     if (Number(ageInput.value) < 0) {
//       ageInput.value = '0';
//     }
//     this.ageInputValue = Number(ageInput.value);
//   });

//   const experienceInput = document.querySelector('.experience') as HTMLInputElement;
//   experienceInput.addEventListener('input', () => {
//     if (Number(experienceInput.value) < 0) {
//       experienceInput.value = '0';
//     }
//     this.experienceInputValue = Number(experienceInput.value);
//   });

//   const imageInput = document.getElementById('imageInput') as HTMLInputElement;
//   const img = document.querySelector('.pfp') as HTMLImageElement;

//   imageInput.addEventListener('change', () => {
//     const fileReader = new FileReader();
//     if (imageInput.files && imageInput.files[0]) {
//       fileReader.readAsDataURL(imageInput.files[0]);
//       fileReader.onload = () => {
//         img.src = fileReader.result as string;
//         console.log(img.src);
//       };
//     }
// });
}

updateUserImage(inputElement: HTMLInputElement) {
  if (inputElement.files && inputElement.files.length > 0) {
    const file = inputElement.files[0];
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.userImage = event.target.result;
    };
    reader.readAsDataURL(file);
  }
}


  saveProfile(): void {
    if (this.userId) {
      const img = document.querySelector('.pfp') as HTMLImageElement;
      const imageInput = this.imageInputRef.nativeElement;
      const imageValue = this.userImage || (this.imageInputRef.nativeElement.files && this.imageInputRef.nativeElement.files[0] ? this.imageInputRef.nativeElement.files[0].name : null);
      // const emailInput = this.emailInputRef.nativeElement;
      // this.userEmail = emailInput.value;

    ////////////////////////////////// Email Update
    // this.authService.updateEmail(this.userEmail)
    // .then(() => {
    //   console.log('Email updated successfully.');
    // })
    // .catch((error) => {
    //   console.log('Error updating email:', error);
    //   Swal.fire('Error', 'Error updating email.', 'error'); 
    // });

    /////////////////////////////////////////Profile Update

  if(Number(this.ageInputValue) > 0 && Number(this.experienceInputValue) >= 0){
        const profileData: profileInterface = {
          id: this.profileId ?? '',
          name: this.userName ?? '',
          age: this.ageInputValue,
          experience: this.experienceInputValue,
          image: img.src,
          userID: this.userId
        };
          this.profileService.updateProfile(profileData)
            .then(() => {
              console.log('Profile updated successfully:', profileData);
              Swal.fire('Profile updated successfully!', '', 'success');
            })
            .catch((error) => {
              console.log('Error updating profile:', error);
              Swal.fire('Error', 'Error updating profile.', 'error');
            });
        } else {
        // console.log('User ID not available.');
        Swal.fire('Error', 'Please Enter Valid Information', 'error');
      }
    }
  }
}

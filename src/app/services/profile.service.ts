import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export interface profileInterface {
  id: string;
  image: string | null;
  name: string;
  age: number;
  userID: string | null;
  experience: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private afs: AngularFirestore, private authService: AuthService) { }


  private generateUniqueId(): string {
    return this.afs.createId();
  }

  public addProfile(profile: profileInterface) {
    profile.id = this.generateUniqueId();
    return this.afs.collection('/profiles')
      .doc(profile.id)
      .set(profile)
      .catch((error) => {
        console.log('Profile creation failed:', error);
        throw error;
      });
  }

  public getProfileByID(userID: string) {
    return this.afs.doc<profileInterface>(`/profiles/${userID}`).get();
  }

  public getAllProfiles() {
    return this.afs.collection('/profiles').snapshotChanges();
  }

  public updateProfile(profile: profileInterface) {
    return this.afs.doc(`/profiles/${profile.id}`).update(profile);
  }

  public deleteProfile(profile: profileInterface) {
    return this.afs.doc(`/profiles/${profile.id}`).delete();
  }

  public getBase64Image(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const dataURL = canvas.toDataURL('image/png');
          resolve(dataURL);
        } else {
          reject('Canvas context is null.');
        }
      };

      img.onerror = function (error) {
        reject(error);
      };

      img.src = url;
    });
  }
}

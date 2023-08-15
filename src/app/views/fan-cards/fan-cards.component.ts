import { Component, OnInit } from '@angular/core';
import { CardInterface, CardService } from 'src/app/services/card.service';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FanCardInterface, FanCardsService } from 'src/app/services/fan-cards.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { profileInterface } from 'src/app/services/profile.service';


@Component({
  selector: 'app-fan-cards',
  templateUrl: './fan-cards.component.html',
  styleUrls: ['./fan-cards.component.css']
})
export class FanCardsComponent implements OnInit {

  userId!: string | null;
  userName!: string;
  userImage!: string | null;


  constructor(private authService: AuthService, private auth: AngularFireAuth, private router: Router, private fanservice: FanCardsService, private firestore: AngularFirestore,) {}

  async ngOnInit() {
    this.userId = await this.authService.getUserId() ; //|| ''
    this.getUserNameAndImage()
  }

  selectedOption: string = '';
  description: string = '';
  imageSrc: string = '';

  updateDescriptionDisplay(event: any) {
    this.description = event.target.value;
  }

  onFileSelected(event: any) {
    const fileReader = new FileReader();
    if (event.target.files && event.target.files[0]) {
      fileReader.readAsDataURL(event.target.files[0]);
      fileReader.onload = () => {
        this.imageSrc = fileReader.result as string;
      };
    } else {
      this.imageSrc =
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png';
    }
  }

async getUserNameAndImage(){
     ///////////////////////////////////////Getting Profile for name
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
              console.log(profileData.image);
              console.log(profileData.name);
              this.userName = profileData.name;
              this.userImage = profileData.image;
            }
          })
          .catch((error) => {
            console.log('Error getting profile:', error);
        });
      }
    }); 
  }

async createPost() {

    const userId = await this.getCurrentUserId();
    if (!this.selectedOption || !this.description ) {
      Swal.fire('Error', 'Please fill in all required fields.', 'error');
      return;
    }
    else if( !userId){
      alert('Please log in first.');
      this.router.navigate(['']); 
      return;
    }

    const currentDate = new Date();
    const minute = currentDate.getMinutes();
    const hour = currentDate.getHours();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Adding 1 because months are zero-based (0 - 11)
    const year = currentDate.getFullYear();
    const formattedDate = `${day}/${month}/${year} (${hour}:${minute})`;

    const fanCard: FanCardInterface = {
      id: '',
      title: this.selectedOption,
      description: this.description,
      imageURL: this.imageSrc ||
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png', 
      creatorID: userId,
      createdAt: formattedDate,
      creatorName: this.userName,
      creatorImage: this.userImage,
      reactedIds: [],
      comments: []
    };
    try {
      await this.fanservice.addFanCard(fanCard);
      this.selectedOption = '';
      this.description = '';
      this.imageSrc = '';
      console.log('Added Card');
      Swal.fire('Card Added Successfuly!', '', 'success');
    } catch (error) {
      console.log(error);
      Swal.fire('Error', 'Card could not be added.', 'error');
    }
  }

  getCurrentUserId(): Promise<string | null> {
    return new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          resolve(user.uid);
        } else {
          resolve(null);
        }
      }, reject);
    });
  }   
}

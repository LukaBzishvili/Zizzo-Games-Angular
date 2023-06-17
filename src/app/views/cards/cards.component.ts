import { Component, OnInit } from '@angular/core';
import { CardInterface, CardService } from 'src/app/services/card.service';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  userId!: string | null;

  constructor(private cardService: CardService, private authService: AuthService, private auth: AngularFireAuth, private router: Router) {}

  async ngOnInit() {
    this.userId = await this.authService.getUserId() ; //|| ''
  }

  selectedOption: string = '';
  description: string = '';
  imageSrc: string = '';
  isApproved: string = 'Unknown';

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
    const currentDate = new Date().toISOString();

    const card: CardInterface = {
      id: '',
      title: this.selectedOption,
      description: this.description,
      imageURL:
      this.imageSrc ||
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png',
      creatorID: userId,
      createdAt: currentDate,
      isApproved: this.isApproved
    };

    try {
      await this.cardService.addCard(card);
      this.selectedOption = '';
      this.description = '';
      this.imageSrc = '';
      this.isApproved = 'Unknown';
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

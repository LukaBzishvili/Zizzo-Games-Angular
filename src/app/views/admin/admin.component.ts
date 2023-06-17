import { Component, OnInit } from '@angular/core';
import { CardInterface, CardService } from 'src/app/services/card.service';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  cards: CardInterface[] = []; 
  isLoading: boolean = true;
  
  constructor(private cardService: CardService) {}

  async ngOnInit() {
    await this.fetchCards();
  }

  async fetchCards() {
    try {
      this.cardService.getAllCards().subscribe((cards) => {
        this.cards = cards.map((card) => card.payload.doc.data() as CardInterface);
        this.isLoading = false;
      });
    } catch (error) {
      console.log(error);
      this.isLoading = false;
    }
  }
  
  approveCard(card: CardInterface) {
    card.isApproved = 'Approved';
    this.updateCard(card);
  }

  declineCard(card: CardInterface) {
    card.isApproved = 'Declined';
    this.updateCard(card);
  }

  updateCard(card: CardInterface) {
    try {
      this.cardService.updateCard(card);
    } catch (error) {
      console.log(error);
    }
  }
}

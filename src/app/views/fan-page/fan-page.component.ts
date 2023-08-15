import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CardInterface, CardService } from 'src/app/services/card.service';
import { Observable, tap } from 'rxjs';
import { FanCardInterface, FanCardsService } from 'src/app/services/fan-cards.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
// import { faHeart } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-fan-page',
  templateUrl: './fan-page.component.html',
  styleUrls: ['./fan-page.component.css']
})
export class FanPageComponent implements OnInit{
  public readonly heartIcon: string = '<fa-icon class="heart" [icon]="faHeart" (click)="reactCard(card)"></fa-icon>';
  public readonly heartIconFill: string = '<fa-icon class="heart" [icon]="faHeart" style="color: red;" (click)="reactCard(card)"></fa-icon>';
  // faHeart = faHeart;
  
  
  @Input() isSingleCard: boolean = false;

  @Input() Fancard: FanCardInterface = {
    id: "",
    title: "",
    description: "",
    imageURL: "",
    creatorID: "",
    createdAt: "",
    creatorName: "",
    creatorImage: "",
    reactedIds: [],
    comments: []
  };
  
  // isReacted: Boolean | undefined;
  cards: FanCardInterface[] = []; 
  isLoading: boolean = true;
  public isUserAuthed: boolean = false;

  constructor(private cardService: CardService, private auth: AuthService, private fanCardService: FanCardsService, private router: Router) {}


  async ngOnInit(): Promise<void> {
    await this.fetchCards();
    
    if(!this.auth.isLoggedIn){
      this.isUserAuthed = false;
    }
    else{
      this.isUserAuthed = true;
    }
  } 

  // isSingleCard: boolean = false;
  selectedCardId: string = '';
  async reactCard(card: FanCardInterface) {
    this.selectedCardId = card.id;
    console.log(card.id);
    
    const currentUserId = await this.auth.getUserId();
    if (currentUserId && !card.reactedIds.includes(currentUserId)) 
    {
      card.reactedIds.push(currentUserId);
      this.updateCard(card);
    }
  }
  
  async fetchCards() {
    try {
      this.fanCardService.getAllFanCards().subscribe((cards) => {
        this.cards = cards.map((card) => card.payload.doc.data() as FanCardInterface);
        this.isLoading = false;
      });
    } catch (error) {
      console.log(error);
      this.isLoading = false;
    }
  }
  
  updateCard(card: FanCardInterface) {
    try {
      this.fanCardService.updateFanCard(card);
    } catch (error) {
      console.log(error);
    }
  }  

  isUserLoggedIn(): Observable<boolean> {
    return this.auth.isLoggedIn();
  }

  openPost() {
  this.router.navigateByUrl(`comments/${this.Fancard.id}`);
  }

  // async getIcon() {
  //   const currentUserId = await this.auth.getUserId();
  //   const iconHtml = currentUserId ? this.heartIconFill : this.heartIcon;
  //   return this.sanitizer.bypassSecurityTrustHtml(iconHtml);
  //   // return this.Fancard.reactedIds.some(uid => uid === currentUserId) ? this.heartIconFill : this.heartIcon;
  //   // return this.Fancard.reactedIds.some(uid => uid === localStorage.getItem("token")) ? this.heartIconFill : this.heartIcon;
  // }

  // async isReacted(card: FanCardInterface): Promise<boolean> {
  //   const currentUserId = await this.auth.getUserId();
  //   return card.reactedIds.includes(currentUserId || '');
  // }
  
  // openPost() {
  //   this.router.navigateByUrl(`post/${this.card.id}`);
  // }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CardService } from 'src/app/services/card.service';
import { FanCardInterface, FanCardsService } from 'src/app/services/fan-cards.service';
import { FanCardsComponent } from '../fan-cards/fan-cards.component';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  public Fancard: FanCardInterface = {
    id: '',
    createdAt: '',
    creatorID: '',
    title: '',
    description: '',
    imageURL: '',
    reactedIds: [],
    comments: [],
    creatorName: '',
    creatorImage: null
  }

  public comment: string = "";
  public email: string = "";

  constructor(private activatedRoute: ActivatedRoute, private cardService: CardService, private authService: AuthService, private fanService: FanCardsService) { }

  async ngOnInit(): Promise<void> {
    this.activatedRoute.params.pipe(
      tap(param => {
        const cardID = param['id'] || "";
        this.cardService.getAllCards().pipe(
          tap(docs => {
            const cards = docs.map(element => element.payload.doc.data()) as FanCardInterface[];
            this.Fancard = cards.find(card => card.id === cardID) || this.Fancard;
          })
        ).subscribe();
      })
    ).subscribe();
    const userEmail = await this.authService.getCurrentUserEmail()
    this.email = userEmail || "";
    // this.authService.isUserAuthed().pipe(
    //   tap(user => {
    //     if (user) {
    //       this.email = user.email || "";
    //     }
    //   })
    // ).subscribe();
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendComment();
    }
  }

  async sendComment() {
  //   try {
  //     const userId = await this.authService.getUserId();
  //     const comment = this.comment;
  //     this.comment = "";
  //     this.Fancard.comments.push({
  //       id: userId || "",
  //       email: this.email,
  //       comment,
  //     });
  //     this.fanService.updateFanCard(this.Fancard);
  //   } catch (error) {
  //     console.log('Error sending comment:', error);
  //   }
  }
}

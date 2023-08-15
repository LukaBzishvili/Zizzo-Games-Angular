import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { profileInterface } from './profile.service';

export interface CardInterface {
  id: string;
  title: string;
  description: string;
  imageURL: string;
  creatorID: string;
  createdAt: string;
  isApproved: string;
  phoneNumber: string;
}

@Injectable({
  providedIn: 'root'
})

export class CardService {

  constructor(private afs: AngularFirestore) { }

  public addCard(card: CardInterface) {
    return this.afs.collection('/cards').add(card).then(res => {
      card.id = res.id;
      this.updateCard(card);
    }, err => {
      console.log(err);
    });
  }

  public getCardByID(id: string) {
    return this.afs.doc(`/cards/${id}`).get();
  }

  public getAllCards() {
    return this.afs.collection('/cards').snapshotChanges();
  }

  public updateCard(card: CardInterface) {
    return this.afs.doc(`/cards/${card.id}`).update(card);
  }

  public deleteCard(card: CardInterface) {
    return this.afs.doc(`/cards/${card.id}`).delete();
  }
  
}

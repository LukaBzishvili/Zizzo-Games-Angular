import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/compat';

export interface FanCardInterface {
  id: string;
  title: string;
  description: string;
  imageURL: string;
  creatorID: string;
  createdAt: string;
  creatorName: string;
  creatorImage: string | null;
  reactedIds: string[],
  comments: []
}

@Injectable({
  providedIn: 'root'
})
export class FanCardsService {

  constructor(private afs: AngularFirestore) { }

  public addFanCard(card: FanCardInterface) {
    return this.afs.collection('/Fancards').add(card).then(res => {
      card.id = res.id;
      this.updateFanCard(card);
    }, err => {
      console.log(err);
    });
  }

  public getFanCardByID(id: string) {
    return this.afs.doc(`/Fancards/${id}`).get();
  }

  public getAllFanCards() {
    return this.afs.collection('/Fancards').snapshotChanges();
  }

  public updateFanCard(card: FanCardInterface) {
    return this.afs.doc(`/Fancards/${card.id}`).update(card);
  }

  public deleteFanCard(card: FanCardInterface) {
    return this.afs.doc(`/Fancards/${card.id}`).delete();
  }

  public updateFanCardReactedIds(cardId: string, newReactedId: string) {
    const fanCardRef = this.afs.doc<FanCardInterface>(`/Fancards/${cardId}`);
  
    return this.afs.firestore.runTransaction((transaction) => {
      return transaction.get(fanCardRef.ref).then((doc) => {
        if (!doc.exists) {
          throw new Error('FanCard does not exist.');
        }
  
        const reactedIds = doc.data()?.reactedIds || [];
  
        if (reactedIds.includes(newReactedId)) {
          return; // Do not update if the newReactedId already exists in the array
        }
  
        transaction.update(fanCardRef.ref, {
          reactedIds: [...reactedIds, newReactedId]
        });
      });
    });
  }
}

import firebase from '../firebase';

export interface User {
  uid: string;
  displayName: string;
  photoUrl: string;
}

export interface Message {
  id: string;
  text: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  user: firebase.firestore.DocumentReference
}

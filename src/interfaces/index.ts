import firebase from "../firebase";

export interface User {
  uid: string;
  displayName: string;
  photoUrl: string;
  status?: {
    state: string;
    lastChanged: firebase.firestore.FieldValue;
  };
}

export interface Message {
  id: string;
  text: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  user: firebase.firestore.DocumentReference;
}

export interface Channel {
  id: string;
  topic: string;
}

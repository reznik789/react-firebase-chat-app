import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/database";
import { firebaseConfig } from "./firebaseConfig";
import { User } from "./interfaces";

const STATUS_ONLINE = "online";
const STATUS_OFFLINE = "offline";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const rtdb = firebase.database();

export function setupPresence(user: User) {
  const rtdbRef = rtdb.ref(`/status/${user.uid}`);
  const userDoc = db.doc(`users/${user.uid}`);

  rtdb.ref(".info/connected").on("value", async function (snap) {
    if (snap.val() === true) {
      userDoc.update({
        status: {
          state: STATUS_OFFLINE,
          lastChanged: firebase.firestore.FieldValue.serverTimestamp()
        }
      });
      return false;
    }
    await rtdbRef.onDisconnect().set({
      state: STATUS_OFFLINE,
      lastChanged: firebase.database.ServerValue.TIMESTAMP
    });
    rtdbRef.set({
      state: STATUS_ONLINE,
      lastChanged: firebase.database.ServerValue.TIMESTAMP
    });
    userDoc.update({
      status: {
        state: STATUS_ONLINE,
        lastChanged: firebase.firestore.FieldValue.serverTimestamp()
      }
    });
  });
}

export { db };
export default firebase;

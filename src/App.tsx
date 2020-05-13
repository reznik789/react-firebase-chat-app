import React, { useState, useCallback, useEffect } from "react";
import { Router, Redirect } from "@reach/router";
import Nav from "./components/Nav";
import Channel from "./components/Channel";
import Login from "./components/Login";
import firebase, { db } from "./firebase";
import { User } from "./interfaces";

const provider: firebase.auth.AuthProvider = new firebase.auth.GoogleAuthProvider();

const App: React.FC = () => {
  const user = useAuth();
  const [authError, setAuthError] = useState<firebase.auth.AuthError | null>(
    null
  );

  const onSignIn = useCallback(async () => {
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      setAuthError(error);
    }
  }, []);

  return user ? (
    <div className="App">
      <Nav user={user} />
      <Router>
        <Channel path="/channel/:channelId" user={user} />
        <Redirect from="/" to="/channel/general" />
      </Router>
    </div>
  ) : (
    <Login onSignIn={onSignIn} authError={authError} />
  );
};

function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        const { uid, displayName, photoURL: photoUrl } = firebaseUser || {};
        const user = {
          uid: uid || "",
          displayName: displayName || "",
          photoUrl: photoUrl || "",
        };
        setUser(user);
        db.collection("users").doc(user.uid).set(user, { merge: true });
      } else setUser(null);
    });
  }, []);

  return user;
}

export default App;

import React, { useState, useCallback, useEffect } from "react";
import Nav from "./components/Nav";
import Channel from "./components/Channel";
import Login from "./components/Login";
import firebase from "./firebase";
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
      <Channel />
    </div>
  ) : (
    <Login onSignIn={onSignIn} authError={authError}/>
  );
};

function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const { uid, displayName, photoURL: photoUrl } = user || {};
        setUser({
          uid: uid || "",
          displayName: displayName || "",
          photoUrl: photoUrl || "",
        });
      } else setUser(null);
    });
  }, []);

  return user;
}

export default App;

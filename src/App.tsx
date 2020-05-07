import React, { useState, useCallback } from "react";
import Nav from "./components/Nav";
import Channel from "./components/Channel";
import Login from "./components/Login";
import firebase from './firebase';

interface User {
  id: string
}

const provider: firebase.auth.AuthProvider = new firebase.auth.GoogleAuthProvider();

const App: React.FC = () => {
  const [user, setUser] = useState<firebase.User | null>(null);

  const onSignIn = useCallback(async() => {
    const result = await firebase.auth().signInWithPopup(provider);
    setUser(result.user);
  }, [])

  return user ? (
    <div className="App">
      <Nav />
      <Channel />
    </div>
  ) : <Login onSignIn={onSignIn} />;
};

export default App;

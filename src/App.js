import React from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyC_KM0hgq40BFtuRwnkFJUVHPRr0pRHNIE",
  authDomain: "chat-app-4acd5.firebaseapp.com",
  projectId: "chat-app-4acd5",
  storageBucket: "chat-app-4acd5.appspot.com",
  messagingSenderId: "1090367839813",
  appId: "1:1090367839813:web:5eb418ae2de34f8b99cd2c",
  measurementId: "G-79CBJXGJBB"
})

const auth = firebase.auth();
const firebase = firebase.firestore();

function App(){

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        
      </header>

      <section>
        {user ? <Chatroom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn(){
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return(
    <button onClick={useSignInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut(){
  return auth.currentUser && (

    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

export default App;

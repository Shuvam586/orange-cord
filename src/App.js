import React, { useRef, useState } from 'react';
import './App.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
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
const firestore = firebase.firestore();

function App(){

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h2>orange-cord 🍊</h2>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
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
    <>
      <button className='sign-in' onClick={signInWithGoogle}>Sign in with Google</button>
    </>
  )
}

function SignOut(){
  return auth.currentUser && (

    <button className='sign-out' onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom(){
  const dummy = useRef();

  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

  const [formValue, setFormValue] = useState('');

  const sendMessage = async(e) => {
    e.preventDefault();
    const {uid, photoURL} = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });

    setFormValue('');

    dummy.current.scrollIntoView({ behaviour: 'smooth' })
  }

  return(
    <>
      <main>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message = {msg} />)}

        <div ref={dummy}></div> 
      </main>

      <form className='message-box' onSubmit={sendMessage}>
        <input className='message-type' value={formValue} onChange={(e) => setFormValue(e.target.value)} />

        <button className='send' type='submit'>
          <p>🚀</p>
        </button>
      </form>
    </>
  )
}

function ChatMessage(props){
  const { text, uid, photoURL } = props.message;
  
  const messageClass = uid === auth.currentUser.uid ? 'sent': 'received';

  return (
  <div className={`message ${messageClass}`}>
    <img className='user-photo' src={photoURL} />
    <p className='user-text' >{text}</p>
  </div>
  )
}

export default App;

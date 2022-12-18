
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCumGPOR1ARzy9YFLla81jMSKiCtlzxGg",
  authDomain: "chat-sop.firebaseapp.com",
  projectId: "chat-sop",
  storageBucket: "chat-sop.appspot.com",
  messagingSenderId: "472168189776",
  appId: "1:472168189776:web:4e5951430d98860ce46655"
};

let app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
export { db, auth };


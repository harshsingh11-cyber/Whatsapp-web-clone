import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB72BVgNNK-2SPhEHqiPfQ9rFv7o8stGFQ",
    authDomain: "whatsapp-web-clone-efad6.firebaseapp.com",
    projectId: "whatsapp-web-clone-efad6",
    storageBucket: "whatsapp-web-clone-efad6.appspot.com",
    messagingSenderId: "398359030336",
    appId: "1:398359030336:web:270734b89589da0a424da5"
  };

let firebaseApp = firebase.initializeApp(firebaseConfig);
let db = firebaseApp.firestore();

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();


export{auth,provider}
export default db;

// import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';
// import 'firebase/compat/auth';
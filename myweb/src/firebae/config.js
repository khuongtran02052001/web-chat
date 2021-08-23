import firebase from "firebase/app";

import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyDaEekDUR-2gbWW_s3WJhJAk6uLs_juEiY",
  authDomain: "app-chat-1449a.firebaseapp.com",
  projectId: "app-chat-1449a",
  storageBucket: "app-chat-1449a.appspot.com",
  messagingSenderId: "142216938529",
  appId: "1:142216938529:web:ebadc94ef6da4bccc60f60",
  measurementId: "G-G4YQQ8J1ZB",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

auth.useEmulator("http://localhost:9099", { disableWarnings: true });
if (window.location.hostname === "localhost") {
  db.useEmulator("localhost", "8080");
}

export { auth, db };
export default firebase;

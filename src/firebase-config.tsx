import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAEpURzr4TIMLSvQIPiplRY0y8Co3AsDZ4",
  authDomain: "course-flearning.firebaseapp.com",
  projectId: "course-flearning",
  storageBucket: "course-flearning.appspot.com",
  messagingSenderId: "874647449745",
  appId: "1:874647449745:web:e1607414ee9dc4680b4f30"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 
const provider = new GoogleAuthProvider();


provider.setCustomParameters({
  prompt: 'select_account', 
});

const signInWithGoogle = (): Promise<UserCredential> => {
  return signInWithPopup(auth, provider);
};

const signInWithEmailAndPassword = (email: string, password: string): Promise<UserCredential> => {
  return firebaseSignInWithEmailAndPassword(auth, email, password);
};

export { auth, provider, signInWithGoogle, signInWithEmailAndPassword };

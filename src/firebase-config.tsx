import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDlB2XJtTy6zNhWdgIeUOo_6C6dI-DQ0WY",
  authDomain: "course-online-caa38.firebaseapp.com",
  projectId: "course-online-caa38",
  storageBucket: "course-online-caa38.appspot.com",
  messagingSenderId: "517392375363",
  appId: "1:517392375363:web:f7e0faf0bcf1c7b3a73ef6"
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

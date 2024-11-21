// firebase-config.tsx
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// Cấu hình Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAEpURzr4TIMLSvQIPiplRY0y8Co3AsDZ4",
  authDomain: "course-flearning.firebaseapp.com",
  projectId: "course-flearning",
  storageBucket: "course-flearning.appspot.com",
  messagingSenderId: "874647449745",
  appId: "1:874647449745:web:e1607414ee9dc4680b4f30"
};

// Khởi tạo Firebase App
const app = initializeApp(firebaseConfig);

// Khởi tạo Authentication
const auth = getAuth(app); 

// Khởi tạo Storage
const storage = getStorage(app);

// Cấu hình Google Provider cho đăng nhập Google
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account', 
});

// Hàm đăng nhập bằng Google
const signInWithGoogle = (): Promise<UserCredential> => {
  return signInWithPopup(auth, provider);
};

// Hàm đăng nhập bằng Email và Password
const signInWithEmailAndPassword = (email: string, password: string): Promise<UserCredential> => {
  return firebaseSignInWithEmailAndPassword(auth, email, password);
};

// Hàm upload file lên Firebase Storage
export const uploadFile = (file: File, fileName: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Tạo một reference mới trong Storage
    const storageRef = ref(storage, 'uploads/' + fileName);

    // Tạo một task upload file
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Có thể theo dõi tiến độ upload nếu cần
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        // Xử lý lỗi nếu có
        console.error("Error uploading file:", error);
        reject(error);
      },
      async () => {
        // Sau khi upload xong, lấy URL của file
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL); // Trả về URL file đã upload
      }
    );
  });
};

export { auth, provider, signInWithGoogle, signInWithEmailAndPassword, storage };
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
const uploadFile = (file: File, storagePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Tạo reference đến Firebase Storage với đường dẫn đã cung cấp
    const storageRef = ref(storage, storagePath);

    // Khởi tạo upload
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Lắng nghe sự kiện thay đổi trạng thái upload
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Có thể thêm logic theo dõi tiến trình upload nếu cần
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        // Xử lý lỗi trong quá trình upload
        reject(error);
      },
      () => {
        // Lấy URL của file sau khi upload thành công
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL); // Trả về URL của file đã upload
        });
      }
    );
  });
};

export { auth, provider, signInWithGoogle, signInWithEmailAndPassword, uploadFile, storage };

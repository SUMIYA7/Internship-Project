// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBLAiM8eLfwRt3NA0vlac6MZaolKLxrwt8",
    authDomain: "ipit-books.firebaseapp.com",
    projectId: "ipit-books",
    storageBucket: "ipit-books.appspot.com",
    messagingSenderId: "901457496157",
    appId: "1:901457496157:web:843b698c7c4a42d93825b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;

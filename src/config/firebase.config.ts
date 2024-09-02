// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCI67EWIRFHmW-Iyw1f8uZHEjghNf9-kYs",
  authDomain: "game-server-8bb06.firebaseapp.com",
  databaseURL: "https://game-server-8bb06-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "game-server-8bb06",
  storageBucket: "game-server-8bb06.appspot.com",
  messagingSenderId: "447862521105",
  appId: "1:447862521105:web:5a14e73c2afc31bd1e60b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const realtimeDb = getDatabase(app)

export { app, realtimeDb }

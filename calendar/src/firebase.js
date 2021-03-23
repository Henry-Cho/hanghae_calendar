import firebase from "firebase/app";
import "firebase/firestore";

// 대시보드에서 가져와야할 config 정보
const firebaseConfig = {
  //
  apiKey: "AIzaSyC0fZKC-bRi8kpJJkxrKsj85F_PJ14nEmE",
  authDomain: "sparta-calender-hw.firebaseapp.com",
  projectId: "sparta-calender-hw",
  storageBucket: "sparta-calender-hw.appspot.com",
  messagingSenderId: "1093695054563",
  appId: "1:1093695054563:web:a4eb331fc52c779a371bd6",
  measurementId: "G-KTPZQ1P5VK",
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export { firestore };

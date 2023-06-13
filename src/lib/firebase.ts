import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCzHuXBzumWHNK1ydcSCZgqeqcKFEmG56c",
  authDomain: "auto-questionnaire-response.firebaseapp.com",
  projectId: "auto-questionnaire-response",
  storageBucket: "auto-questionnaire-response.appspot.com",
  messagingSenderId: "318718983624",
  appId: "1:318718983624:web:c487afd46004bae2dfd4fd",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);

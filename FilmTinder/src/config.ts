import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyC1cxAEuSEccmNlDAXuSjueCqdjqHFh3Tc",
    authDomain: "filmtinder-cd676.firebaseapp.com",
    projectId: "filmtinder-cd676",
    storageBucket: "filmtinder-cd676.appspot.com",
    messagingSenderId: "427456333547",
    appId: "1:427456333547:web:501ae8c496edcdeef160ae",
    measurementId: "G-TJLMM1PLY7"
  };
  const firebaseApp = initializeApp(firebaseConfig);
  
  export default firebaseApp


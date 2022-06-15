// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore' //firesotre 도큐먼트(DB)에 접속
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDS3Cga-06i61Xowjn0bbHqL-7moAZGqkc",
    authDomain: "crwn-clothing-db-6b834.firebaseapp.com",
    projectId: "crwn-clothing-db-6b834",
    storageBucket: "crwn-clothing-db-6b834.appspot.com",
    messagingSenderId: "476811591143",
    appId: "1:476811591143:web:0fae4703991f6c16cb5142"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider(); //구글용

provider.setCustomParameters({
    prompt: "select_account",

});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore(); //db 접속할수 있게끔 export

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid ) //해당 user 있는지 확인

    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists()) //users가 있는지

};
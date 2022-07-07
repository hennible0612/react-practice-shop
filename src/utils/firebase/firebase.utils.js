// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth'
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
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);


export const db = getFirestore(); //db 접속할수 있게끔 export

export const createUserDocumentFromAuth = async (userAuth, additionalInformation={displayName: 'mike'}) => {
    if(!userAuth) return;


    const userDocRef = doc(db, 'users', userAuth.uid) //해당 user 있는지 확인


    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists()) //users가 있는지

    if (!userSnapshot.exists()) { //User가 없을 경우
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }
    return userDocRef;
};
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) {
        return;
    }

    return await createUserWithEmailAndPassword(auth, email, password);


};

export const signInAuthUserWithEmailAndPassword = async (email, password) =>{
    if (!email || !password) {
        return;
    }
    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {
    onAuthStateChanged(auth, callback); //onAuthStateChanged가 실행될려고 하면 auth랑 callback이 필요함 // auth가 바뀔때마다 실행
    // 한번로드 되면 계속 대기를 한다. // 그래서 onAuthStateChanged의 결과 값을 return 해줘야한다.
    // obserber pattern // 일반 callback, errorCallback, completedCallback을 줄수 있음
};

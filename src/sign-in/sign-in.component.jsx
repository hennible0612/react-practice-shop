import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInWithGoogleRedirect,
    auth
} from "../utils/firebase/firebase.utils";
import {useEffect} from 'react';
import {getRedirectResult} from 'firebase/auth'

const SignIn = () => {

    useEffect(() => {
        (async () => {
            const response = await getRedirectResult(auth);
            if (response) {//response 성공시
                const userDocRef = await createUserDocumentFromAuth(response.user);
            }
        })();
    }, []);//빈 배열일시 해당 콤포넌트한번만 시작시 부름

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user)

    };

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>
                Sign in with Google Popup
            </button>
            <button onClick={signInWithGoogleRedirect}>
                Sign in with Google Redirect
            </button>
        </div>
    )
};

export default SignIn
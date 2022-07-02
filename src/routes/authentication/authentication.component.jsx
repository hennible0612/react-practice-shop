import {
    createUserDocumentFromAuth,
    signInWithGoogleRedirect,
    auth
} from "../../utils/firebase/firebase.utils";
import {useEffect} from 'react';
import {getRedirectResult} from 'firebase/auth'
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import './authentication.styles.scss'


const Authentication = () => {

    useEffect(() => {
        (async () => {
            const response = await getRedirectResult(auth);
            if (response) {//response 성공시
                const userDocRef = await createUserDocumentFromAuth(response.user);
            }
        })();
    }, []);//빈 배열일시 해당 콤포넌트한번만 시작시 부름



    return (
        <div className='authentication-container'>
            <SignInForm />
            <SignUpForm/>
        </div>
    )
};

export default Authentication

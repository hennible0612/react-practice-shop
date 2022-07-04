import {useEffect, useState, useContext} from "react";
import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.style.scss'
import Button from "../button/button.component";
import {UserContext} from "../../contexts/user.context";

const defaultFormFields = {
    email: '',
    password: '',
}


const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields) // 여기서 formFields를 defaultFormFields를 가르킨다.
    const {email, password} = formFields; //destruct

    const {setCurrentUser} = useContext(UserContext)

    const resetFormFields = () => {
        setFormFields({...formFields, ["name"]: " "})
        // setFormFields(defaultFormFields)

    };

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user)

    };

    const handleSubmit = async (event) => {
        event.preventDefault();



        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);

            setCurrentUser(user) // 로그인시 userContext를 사용해서 현재 User저장
            console.log(user)
            resetFormFields()
        } catch (error) {

            switch (error.constructor) {
                case 'auth/wrong-password':
                    alert("incorrectr password for email")
                    break;

                case 'auth/user-not-found':
                    alert("no user associated with this email")
                    break;
                default:
                    console.log(error)

            }


        }

    };


    const handleChange = (event) => { //onChange를 사용하여 호출 onchange는 event return 함
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value}) //...formFields 모든 form 나열 후 set
    }

    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={() => {
            }}>


                <FormInput
                    label="Email"
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}
                />

                <FormInput
                    label="Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}
                />
                <div className='buttons-container'>
                    <Button type="submit" onClick={handleSubmit}>Sign In</Button>
                    <Button type="button" buttonType='google' onClick={signInWithGoogle}>Google sign in</Button>
                </div>

            </form>
        </div>
    );
};

export default SignInForm;
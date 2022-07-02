import {useEffect, useState} from "react";
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.style.scss'
import Button from "../button/button.component";
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}


const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields) // 여기서 formFields를 defaultFormFields를 가르킨다.
    const {displayName, email, password, confirmPassword} = formFields; //destruct

    const handleChange = (event) => { //onChange를 사용하여 호출 onchange는 event return 함
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value}) //...formFields 모든 form 나열 후 set
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields)

    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password != confirmPassword) {
            alert("pls check your password");
            return;
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields()
        } catch (error) {
            resetFormFields()

            if (error.code === 'auth/email-already-in-use') {
                alert("cannot create user, email aleready in use")
            }
            console.log('user creation encountered an error', error);
        }

    };

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={() => {
            }}>
                <FormInput
                    label="Display Name"
                    type="text"
                    required
                    onChange={handleChange}
                    name="displayName"
                    value={displayName}
                />

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

                <FormInput
                    label="Confirm Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword}
                />

                <Button type="submit" onClick={handleSubmit}>Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUpForm;
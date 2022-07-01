import {useEffect, useState} from "react";
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";

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
        setFormFields({...formFields,["name"] : " "})
        // setFormFields(defaultFormFields)

    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password != confirmPassword) {
            alert("pls check your password");
            return;
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields()
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert("cannot create user, email aleready in use")
            }
            console.log('user creation encountered an error', error);
        }


        //check password
        //성공했는지
        //create userdoc

        // createAuthUserWithEmailAndPassword
    };

    return (
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={() => {
            }}>
                <label>Display Name</label>
                <input type="text" required onChange={handleChange} name="displayName" value={displayName}/>

                <label>Email</label>
                <input type="email" required onChange={handleChange} name="email" value={email}/>

                <label>Password</label>
                <input type="password" required onChange={handleChange} name="password" value={password}/>

                <label>Confirm Password</label>
                <input type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>

                <button type="submit" onClick={handleSubmit}>Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpForm;
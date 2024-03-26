import React, { useState } from 'react';
import './LoginPopup.css';
import { signUp, confirmSignUp } from 'aws-amplify/auth';
import AuthHeader from './AuthHeader';

interface SignUpProps {
    onClose: () => void;
    setAuth: () => void;
    setShowSignup: () => void;
}

const SignUpPage: React.FC<SignUpProps> = ({setAuth, setShowSignup, onClose}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [confirmationCode, setAuthCode] = useState('')
    const [step, setStep] = useState(0)

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.log("User is signing up!!");
            const { isSignUpComplete, nextStep } = await signUp({
                username,
                password,
                options: {
                    userAttributes: {
                        email
                    }
                }
            });
            console.log("username is ", username);
            console.log("sign up complete?", isSignUpComplete);
            console.log("next steps", nextStep);
            console.log("Successfully signed up!!, confirmation remaining....");
            setStep(1);
        } catch(error) {
            console.log(username);
            console.log("error message", error);
        }
    }

    const handleConfirmSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.log(username);
            console.log(confirmationCode);
            // const { isSignUpComplete } = await confirmSignUp(username, authCode)
            const { isSignUpComplete, nextStep } = await confirmSignUp({
                username,
                confirmationCode
              });
            console.log("user successfully signed up", isSignUpComplete);
        } catch (error) {
            console.log("error confirming sign up!!", error);
        }
        onClose();
        setShowLogin()
    }

    const setShowLogin = async () => {
        setShowSignup(false);
    }

    return (
        <div className="popup">
            <div className="popup-inner">
                <AuthHeader authType="Sign Up" onClose={onClose}/>
                {
                    (step === 0) ? (
                        <form>
                            <label>
                                Username:
                                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                            </label>
                            <label>
                                Password:
                                <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
                            </label>
                            <label>
                                Email:
                                <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                            </label>
                            <button type="submit" onClick={ handleSignUp }>Sign Up</button>
                        </form>
                    ) : (
                        <form>
                            <label>
                                Username:
                                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                            </label>
                            <label>
                                Authentication Code:
                                <input type="text" value={confirmationCode} onChange={e => setAuthCode(e.target.value)} />
                            </label>
                            <button type="submit" onClick={ handleConfirmSignUp }>Confirm Sign Up</button>
                        </form>
                    )
                }
            </div>
        </div>
    )
}

export default SignUpPage;
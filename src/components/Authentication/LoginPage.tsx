import React, { useState } from 'react';
import './LoginPopup.css';
import { signIn } from 'aws-amplify/auth';

interface LoginPopupProps {
    onClose: () => void;
    setAuth: () => void;
    setShowSignup: () => void;
}

const LoginPage: React.FC<LoginPopupProps> = ({setShowSignup, setAuth, onClose}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { isSignedIn } = await signIn({ username, password });
            if(!isSignedIn)
                throw new Exception("user is not able to signIn");
            setAuth(isSignedIn);
            console.log("User is authenticated!!", isSignedIn);
        } catch (error) {
            console.log('error signing in', error);
        }
        onClose();

    };

    const handleSignup = async () => {
        console.log("User wants to signup!!")
        setShowSignup(true);
    }

    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Solace | Login</h2>
                <form>
                    <label>
                        Username:
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                    </label>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                        <a href="#">Forgot Password?</a>
                    </label>
                    <button type="submit" onClick={handleSubmit}>Login</button><br></br>
                    <a href='#' onClick={setShowSignup}><span>Don't have an account? Sign up now!</span></a>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;
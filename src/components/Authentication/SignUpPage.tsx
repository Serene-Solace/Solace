import React, { useState } from 'react';
import './LoginPopup.css';
import { signIn } from 'aws-amplify/auth';

interface LoginPopupProps {
    onClose: () => void;
    setAuth: () => void;
}

const SignUpPage: React.FC<LoginPopupProps> = ({setAuth, onClose}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { isSignedIn } = await signIn({ username, password });
            setAuth(isSignedIn);
            console.log("User is authenticated!!", isSignedIn);
          } catch (error) {
            console.log('error signing in', error);
          }
        onClose();
    };

    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Solace | Login</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Username:
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                    </label>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                        <a href="#">Forgot Password?</a>
                    </label>
                    <button type="submit">Login</button><br></br>
                    <a href='#'><span>Don't have an account? Sign up now!</span></a>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;
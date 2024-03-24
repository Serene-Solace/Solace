import React, { useState } from 'react';
import './LoginPopup.css';

interface LoginPopupProps {
    onClose: () => void;
}

const LoginPage: React.FC<LoginPopupProps> = ({onClose}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Implement your login logic here
        console.log('Logging in with:', username, password);
        // Close the popup
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
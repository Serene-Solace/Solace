import React, { useState } from 'react';
import './LoginPopup.css';
import { signIn } from 'aws-amplify/auth';
import { Button, Typography } from '@mui/material';
import AuthHeader from './AuthHeader';


interface LoginPopupProps {
    onClose: () => void;
    setAuth: React.Dispatch<React.SetStateAction<boolean>>;
    setShowSignup: () => void;
}

const LoginPage: React.FC<LoginPopupProps> = ({setShowSignup, setAuth, onClose}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { isSignedIn } = await signIn({ username, password });
            // if(!isSignedIn)
            //     throw new ("user is not able to signIn");
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
                <AuthHeader authType="Sign In" onClose={onClose}/>
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
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleSubmit}
                    >Sign In</Button>
                    <Typography variant="h6" align="center">
                        Don't have an account? <a href='#' onClick={handleSignup}>Sign up now!</a>
                    </Typography>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;
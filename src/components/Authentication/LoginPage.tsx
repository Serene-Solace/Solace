import React, { useState } from 'react';
import './LoginPopup.css';
import { signIn } from 'aws-amplify/auth';
import { Button, IconButton, Typography } from '@mui/material';
import AuthHeader from './AuthHeader';
import google from '../../assets/logo/google.png';


interface LoginPopupProps {
    onClose: () => void;
    setAuth: React.Dispatch<React.SetStateAction<boolean>>;
    setShowSignup: React.Dispatch<React.SetStateAction<boolean>>;
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

    const handleGoogleSignIn = () => {
        console.log("Tried to login using google");
    }

    return (
        <div className="popup">
            <div className="popup-inner">
                <AuthHeader authType="Sign In" onClose={onClose}/>
                <form onSubmit={handleSubmit}>
                    <label>
                        Username:
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} required/>
                    </label>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required/>
                        <a href="#">Forgot Password?</a>
                    </label>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >Sign In</Button>
                    <Typography variant="h6" align="center">
                        Don't have an account? <a href='#' onClick={handleSignup}>Sign up now!</a>
                    </Typography>
                    <Typography variant='body1' align="center">
                        or you can sign in with<br></br>
                        <IconButton
                            onClick={handleGoogleSignIn}
                            aria-label="Google Sign In"
                            sx={{
                                '&:hover img': {
                                    transform: 'scale(1.5)',
                                },
                            }}
                        >
                            <img src={google} alt="Google Logo" style={{ width: 16, height: 16 }}/>
                        </IconButton>
                    </Typography>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;
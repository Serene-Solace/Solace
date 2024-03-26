import { Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import logo from '../../assets/logo/logo.svg';
import './header.css';
import { Link } from 'react-router-dom';
import LoginPage from '../Authentication/LoginPage';
import SignUpPage from '../Authentication/SignUpPage';
import { signOut } from 'aws-amplify/auth';

type HeaderProps = {
    signOut: any;
}

const Header: React.FC<HeaderProps> = (props) => {

    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [isAuth, setAuth] = useState(false);

    const handleLoginClick = () => {
        setShowLogin(true);
        console.log("User clicked on Login Button!!", showLogin);
    };

    const handleCloseLogin = () => {
        setShowLogin(false);
    };

    const handleLogout = async () => {
        try {
            await signOut();
            setAuth(false);
            setShowLogin(false);
            console.log("user is successfully logged out!!");
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    return (
        <Grid container className={"container-class"}>
            <Grid item md={9}>
                <CustomLink to="/">
                    <img className={"image-logo"} src={logo} />
                </CustomLink>
            </Grid>

            <Grid
                container md={3}
                direction="row"
                justifyContent={'space-evenly'}
                alignItems="center"
                spacing={2}
                className={"side-menu"}>
                <Grid item>
                    <CustomLink to="/upload">
                        <Typography> Resource </Typography>
                    </CustomLink>
                </Grid>
                <Grid item>
                    <CustomLink to="/about">
                        <Typography> About Us </Typography>
                    </CustomLink>
                </Grid>
                {isAuth ?
                    <Grid item>
                        <Typography onClick={handleLogout}> Log Out </Typography>
                    </Grid>
                                    :
                    <Grid item>
                        <Typography onClick={handleLoginClick}> Log In </Typography>
                        {showLogin && !showSignup && <LoginPage setShowSignup={setShowSignup} setAuth={setAuth} onClose={handleCloseLogin} />}
                        {showLogin && showSignup && <SignUpPage setShowSignup={setShowSignup} setAuth={setAuth} onClose={handleCloseLogin} />}
                    </Grid>
                }
            </Grid>
        </Grid>
    );
}

const linkStyle = {
    textDecoration: "none",
    color:  "#155EEF"
  };

function CustomLink({ to, children, ...props }: { to: any, children: any }) {
    return (
        <Link className={"login"} to={to} {...props} style={linkStyle}>
            {children}
        </Link>
    )
}

export default Header;
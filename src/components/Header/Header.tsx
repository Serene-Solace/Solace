import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import logo from '../../assets/logo/logo.svg';
import './header.css';
import { Link } from 'react-router-dom';
import LoginPage from '../Authentication/LoginPage';
import SignUpPage from '../Authentication/SignUpPage';
import { signOut } from 'aws-amplify/auth';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InlineMessage from '../Authentication/InlineMessage';
import { getCurrentUser } from 'aws-amplify/auth';

const Header: React.FC = () => {

    const [showLogin, setShowLogin] = useState<boolean>(false);
    const [showSignup, setShowSignup] = useState<boolean>(false);
    const [isAuth, setAuth] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [isSignedOut, setIsSignedOut] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');

    const handleClick = () => {
        setOpen(!open);
    };

    useEffect(() => {
            const handleAuth = async () => {
            try {
                const { username } = await getCurrentUser();
                setUsername(username);
                setAuth(true);
                console.log("User: ", username);
            } catch(error) {
                console.log("User is not signed!!");
            }
        }
        handleAuth();
    }, [isAuth]);

    const handleLoginClick = () => {
        setShowLogin(true);
    };

    const handleCloseLogin = () => {
        setShowLogin(false);
        setShowSignup(false);
    };

    const handleLogout = async () => {
        try {
            await signOut();
            setAuth(false);
            setShowLogin(false);
            console.log("user is successfully logged out!!");

            setIsSignedOut(true);
            setTimeout(() => {
                setIsSignedOut(false);
            }, 3000);
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    return (
        <>
            {isSignedOut && <InlineMessage message='You have successfully Signed out!!' type='success' />}
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
                        <List
                            sx={{ width: '100%', maxWidth: 140, bgcolor: 'background.paper' }}
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                        >
                            <ListItemButton onClick={handleClick}>
                                <Typography> Hi, {username}
                                </Typography>
                                {open ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <Typography onClick={handleLogout}> Sign Out </Typography>
                                    </ListItemButton>
                                </List>
                            </Collapse>
                        </List>
                        :
                        <Grid item>
                            <Typography onClick={handleLoginClick}> Sign In </Typography>
                            {showLogin && !showSignup && <LoginPage setShowSignup={setShowSignup} setAuth={setAuth} onClose={handleCloseLogin} />}
                            {showLogin && showSignup && <SignUpPage setShowSignup={setShowSignup} onClose={handleCloseLogin} />}
                        </Grid>
                    }
                </Grid>
            </Grid>
        </>
    );
}

const linkStyle = {
    textDecoration: "none",
    color: "#155EEF"
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomLink({ to, children, ...props }: { to: any, children: any }) {
    return (
        <Link className={"login"} to={to} {...props} style={linkStyle}>
            {children}
        </Link>
    )
}

export default Header;
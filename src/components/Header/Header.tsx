import { Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
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

const Header: React.FC = () => {

    const [showLogin, setShowLogin] = useState<boolean>(false);
    const [showSignup, setShowSignup] = useState(false);
    const [isAuth, setAuth] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [isSignedOut, setIsSignedOut] = useState<boolean>(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleLoginClick = () => {
        setShowLogin(true);
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
                                <Typography> Hi Ritesh! </Typography>
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
                            {showLogin && showSignup && <SignUpPage setShowSignup={setShowSignup} setAuth={setAuth} onClose={handleCloseLogin} />}
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

function CustomLink({ to, children, ...props }: { to: any, children: any }) {
    return (
        <Link className={"login"} to={to} {...props} style={linkStyle}>
            {children}
        </Link>
    )
}

export default Header;
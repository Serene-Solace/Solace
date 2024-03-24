import { Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import logo from '../../assets/logo/logo.svg';
import './header.css';
import { Link } from 'react-router-dom';
import LoginPage from '../Authentication/LoginPage';

type HeaderProps = {
    signOut: any;
}

const Header: React.FC<HeaderProps> = (props) => {

    const [showLogin, setShowLogin] = useState(false);

    const handleLoginClick = () => {
        setShowLogin(true);
    };

    const handleCloseLogin = () => {
        setShowLogin(false);
    };

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
                <Grid item>
                <Typography onClick={handleLoginClick}> Log In </Typography>
                    {showLogin && <LoginPage onClose={handleCloseLogin} />}
                </Grid>
                <Grid item>
                    <a className={"login"} onClick={props.signOut}>
                        <Typography > Log Out </Typography>
                    </a>
                </Grid>
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
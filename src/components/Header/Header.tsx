import {Button, Grid, Typography} from '@mui/material';
import React from 'react';
import logo from '../../assets/logo/logo.svg';
import './header.css';
import { Link } from 'react-router-dom';

type HeaderProps = {
    signOut:any;
}

const Header : React.FC<HeaderProps> = (props) => {
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
                    <Button className={"login"} onClick={props.signOut}>
                        <Typography > Log Out </Typography>
                    </Button>
                </Grid>
            </Grid>
        </Grid>
  );
}
   
function CustomLink({ to, children, ...props } : {to:any, children:any}) {
    
    return (
        <li>
        <Link to={to} {...props}>
            {children}
        </Link>
        </li>
    )
}

export default Header;
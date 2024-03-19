import {Grid, Typography, Link} from '@mui/material';
import React from 'react';
import logo from '../../assets/logo/logo.svg';
import './header.css';

export interface IHeaderProps {
}

export const Header : React.FC = (props: IHeaderProps) => {
  return (
        <Grid container className={"container-class"}>
            <Grid item md={9}>
                <img className={"image-logo"} src={logo} />
            </Grid>

            <Grid container md={3} direction="row" justifyContent={'space-evenly'} alignItems="center" spacing={2} className={"side-menu"}>
                <Grid item>
                    <Typography> Resource </Typography>
                </Grid>
                <Grid item>
                    <Typography> About Us </Typography>
                </Grid>
                <Grid item>
                    <a href="" className={"login"}>
                        <Typography > Login </Typography>
                    </a>
                </Grid>
            </Grid>
        </Grid>
  );
}

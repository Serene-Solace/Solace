import React from 'react'
import {Grid, Typography} from '@mui/material';
import Moon from '../../assets/images/Moon.svg';
import Design from '../../assets/images/Right_Banner.svg';
import './landingPage.css';

const LeftBanner : React.FC  = () => {
    return (
        <Grid container item md ={6} justifyContent='center' alignItems='center' direction={'column'}>
            <Grid container item className={'moon-image'}>
                <img src={Moon} />
            </Grid>
            <Grid item>
                <Typography variant='h2'>Explore content <br/>more deeply and <br/>effectively.</Typography>
            </Grid>
            <div>
                <button  color="baseBlue" className="button-material-ui-explore-now">
                    Explore Now
                </button>
            </div>
        </Grid>
    );
}

const RightBanner : React.FC  = () => {
    return (
        <Grid item md={6} className={'right-image-container'}>
            <img src={Design} className='banner-image'/>
        </Grid>
    );
}

export const LandingPage : React.FC = () => {
  return (
    <Grid container className='background' md={12} spacing={2} justifyContent='center' alignItems='center'>
        <LeftBanner />
        <RightBanner />
    </Grid>
  )
}
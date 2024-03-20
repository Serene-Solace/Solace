import React from 'react'
import {Grid} from '@mui/material';
import './landingPage.css';
import LeftBanner from './LeftBanner';
import RightBanner from './RightBanner';


export const LandingPage : React.FC = () => {
  return (
    <Grid container className='background' md={12} spacing={2} justifyContent='center' alignItems='center'>
        <LeftBanner />
        <RightBanner />
    </Grid>
  )
}
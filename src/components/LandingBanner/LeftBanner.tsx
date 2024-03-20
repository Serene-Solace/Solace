import { Grid, Typography } from "@mui/material";
import ButtonBlue from "../common/ButtonBlue/ButtonBlue";
import Moon from '../../assets/images/Moon.svg';

const LeftBanner : React.FC  = () => {
    return (
        <Grid container item md ={6} justifyContent='center' alignItems='center' direction={'column'}>
            <Grid container item className={'moon-image'}>
                <img src={Moon} />
            </Grid>
            <Grid item>
                <Typography variant='h2'>Explore content <br/>more deeply and <br/>effectively.</Typography>
            </Grid>
            <ButtonBlue contentVal = "Explore Now"/>
        </Grid>
    );
}

export default LeftBanner;
import { Grid } from "@mui/material";
import Design from '../../assets/images/Right_Banner.svg';

const RightBanner : React.FC  = () => {
    return (
        <Grid item md={6} className={'right-image-container'}>
            <img src={Design} className='banner-image'/>
        </Grid>
    );
}

export default RightBanner;
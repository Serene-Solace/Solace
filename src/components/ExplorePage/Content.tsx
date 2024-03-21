import { Grid, Typography } from "@mui/material";

const Content = (props : any) => {
  const {isFileUploaded, fileName} = props;
    return(
      <Grid container item justifyContent={'space-between'} alignItems={'center'} alignContent={'center'} direction={'column'} spacing={2}>
        <Grid item>
        <Typography variant={'h5'} className='add-your-files'>{isFileUploaded ? 'Replace your files' : 'Add your files'}</Typography>
        </Grid>
        
        <br/>
        <Grid item>
          <Typography variant='caption' alignContent='center'>
                  {isFileUploaded ? `You have selected ${fileName}` :`Start adding any kind of PDF and explore it with personal Assistant.`} 
          </Typography>
        </Grid>
      </Grid>
    );
  }

  export default Content;
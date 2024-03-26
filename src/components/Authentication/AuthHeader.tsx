import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import { Typography, IconButton } from '@mui/material';

interface AuthHeaderProps {
    onClose: () => void;
    authType: string;
}


const AuthHeader: React.FC<AuthHeaderProps> = ({onClose, authType }) => {

    return (
        <>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography component="h1" variant="h5">
                        Solace | {authType}
                    </Typography>
                </Grid>
                <Grid item>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </>
    )
}

export default AuthHeader;
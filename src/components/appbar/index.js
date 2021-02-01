import { 
    AppBar,
    CssBaseline, 
    Grid, 
    Toolbar,
    Typography
} from '@material-ui/core';

import React from 'react';
import styles from './styles';

const Appbar = () => {
    const classes = styles();
    
    return(
        <React.Fragment>
            <CssBaseline>
                <AppBar color="primary">
                    <Toolbar>
                        <Grid container direction="column" alignContent="center">
                            <Grid item>
                                <Typography className={classes.titleText}>Cryptoons</Typography>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </CssBaseline>
        </React.Fragment>
    )
}

export default Appbar;
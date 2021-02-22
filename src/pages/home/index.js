
import { CssBaseline, Grid, Hidden, FormControl, Select, Typography, Divider, Toolbar, ListSubheader, MenuItem, FormLabel } from '@material-ui/core';
import React, { useState } from 'react'
import Appbar from '../../components/appbar';
import AlphabetForm from '../../components/alphabetForm';
import styles from './styles';
import AsciiForm from '../../components/asciiForm';
// import { getMenu } from '../../utils';
// import AsciiForm from '../../components/asciiForm';

const Home = () => {
    const classes = styles();
    

    const [state, setState] = useState({
        algorithm: ''
    })

    const changeAlgorithm = (value) => {
        setState({
            ...state,
            algorithm: value
        })
    }


    
    return (
        <CssBaseline>
            <Grid container direction="column">
                <Grid item>
                    <Appbar>
                        <Toolbar>
                            <Typography>CRYPTOONS</Typography>
                        </Toolbar>
                    </Appbar>
                </Grid>
                <Grid item>
                    <Grid container direction="row" justify="space-between">
                        <Hidden xsDown>
                            <Grid item xs={false} sm={2} md={3}>
                            </Grid>
                        </Hidden>
                        
                        <Grid item xs={12} sm={8} md={6}>
                            <Grid container direction="column" justify="space-between" >
                                <Grid item className={classes.container} >
                                    <Grid container direction="column">
                                        <Grid item className={classes.p20}>
                                            <FormControl variant="standard" className={classes.formControl}>
                                                <FormLabel component="legend">Algorithm</FormLabel>
                                                <Select inputProps={{id: "algorithm"}} onChange={(e)=>changeAlgorithm(e.target.value)} value={state.algorithm}>
                                                    <ListSubheader>Classic Cryptography</ListSubheader>
                                                    <MenuItem value={0}>Vigenere Cipher Standard</MenuItem>
                                                    <MenuItem value={1}>Full Vigenere Cipher</MenuItem>
                                                    <MenuItem value={2}>Auto-key Vigenere Cipher</MenuItem>
                                                    <MenuItem value={3}>Extended Vigenere Cipher</MenuItem>
                                                    <MenuItem value={4}>Playfair Cipher</MenuItem>
                                                    <MenuItem value={5}>Affine Cipher</MenuItem>
                                                    <ListSubheader>Stream Cipher</ListSubheader>
                                                    <MenuItem value={6}>RC4</MenuItem>
                                                    <MenuItem value={7}>Modified RC4</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Divider/>
                                        <Grid item className={classes.p20}>
                                            {
                                                (
                                                    state.algorithm === 0 ||
                                                    state.algorithm === 1 ||
                                                    state.algorithm === 2 ||
                                                    state.algorithm === 4 ||
                                                    state.algorithm === 5
                                                ) ?
                                                <AlphabetForm algorithm={state.algorithm}/>
                                                :
                                                (
                                                    state.algorithm === 3
                                                ) ?
                                                <AsciiForm algorithm={state.algorithm}/>
                                                :
                                                <Typography>ABC</Typography>
                                            
                                            }
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Hidden xsDown>
                            <Grid item xs={false} sm={2} md={3}>
                            </Grid>
                        </Hidden>
                    </Grid>
                </Grid>
            </Grid>
        </CssBaseline>
    )
}

export default Home;
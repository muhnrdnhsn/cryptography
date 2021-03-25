
import { CssBaseline, Grid, Hidden, FormControl, Typography, Divider, Toolbar, FormLabel, NativeSelect } from '@material-ui/core';
import React, { useState } from 'react'
import Appbar from '../../components/appbar';
import AlphabetForm from '../../components/alphabetForm';
import styles from './styles';
import AsciiForm from '../../components/asciiForm';
import GenerateForm from '../../components/generateForm';
// import { getMenu } from '../../utils';
// import AsciiForm from '../../components/asciiForm';

const Home = () => {
    const classes = styles();
    

    const [state, setState] = useState({
        algorithm: 0  
    })

    const changeAlgorithm = (value) => {
        setState({
            ...state,
            algorithm: parseInt(value, 10)
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
                                                <NativeSelect inputProps={{id: "algorithm"}} onChange={(e)=>changeAlgorithm(e.target.value)} value={state.algorithm}>
                                                    <optgroup label="Classic Cryptography">
                                                        <option value="0">Vigenere Cipher Standard</option>
                                                        <option value="1">Full Vigenere Cipher</option>
                                                        <option value="2">Auto-key Vigenere Cipher</option>
                                                        <option value="3">Extended Vigenere Cipher</option>
                                                        <option value="4">Playfair Cipher</option>
                                                        <option value="5">Affine Cipher </option>
                                                    </optgroup>
                                                    <optgroup label="Stream Cipher">
                                                        <option value="6">RC4</option>
                                                        <option value="7">Modified RC4</option>
                                                    </optgroup>
                                                    <optgroup label="RSA">
                                                        <option value="8">Public and Private Key</option>
                                                        <option value="9">Encryption and Decryption</option>
                                                    </optgroup>
                                                </NativeSelect>
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
                                                    state.algorithm === 3 ||
                                                    state.algorithm === 6 ||
                                                    state.algorithm === 7 ||
                                                    state.algorithm === 9
                                                ) ?
                                                <AsciiForm algorithm={state.algorithm}/>
                                                :
                                                (
                                                    state.algorithm === 8
                                                ) ?
                                                <GenerateForm algorithm={state.algorithm}/>
                                                :
                                                <Typography></Typography>
                                            
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
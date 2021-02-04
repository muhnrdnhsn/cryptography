
import { CssBaseline, Grid, Hidden, FormControl, InputLabel, Select, Typography, Divider, Paper } from '@material-ui/core';
import React, { useState } from 'react'
import Appbar from '../../components/appbar';
import AlphabetForm from '../../components/alphabetForm';
import Drawer from '../../components/drawer';
import styles from './styles';
import { getMenu } from '../../utils';
import AsciiForm from '../../components/asciiForm';

const Home = () => {
    const classes = styles();
    
    const menus = getMenu();

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

                {/* APPBAR HIDDEN WHEN MD OR MORE */}
                <Grid item > 
                    <Hidden smUp implementation="css">
                        <Appbar/>
                    </Hidden>
                </Grid>

                <Grid item>
                    <Grid container direction="row">

                        {/* DRAWER HIDDEN WHEN XS OR LESS*/}
                        <Hidden xsDown implementation="css">
                            <Drawer menu={menus} changeAlgorithm={changeAlgorithm} currentAlgorithm={state.algorithm}/>
                        </Hidden>

                        {/* MAIN CONTENT */}
                        <Grid item xs={12} className={classes.mainContainer}>
                            <Grid container spacing={2} direction="column">

                                {/* PENGGANTI DRAWER */}
                                <Hidden smUp implementation="css">
                                    <Grid item className={classes.flexCenter}>
                                        <FormControl variant="outlined"  className={classes.formControl}>
                                            <InputLabel htmlFor="outlined-algo">Algorithm</InputLabel>
                                            <Select
                                                native
                                                value={state.algorithm}
                                                onChange={(e) => changeAlgorithm(e.target.value)}
                                                label="Algorithm"
                                                inputProps={{
                                                    name: 'algorithm',
                                                    id: 'outlined-algo',
                                                }}
                                            >
                                                {
                                                    state.algorithm === '' &&
                                                    <option aria-label="None" value="" />
                                                }
                                                {menus.map((value,index) => (
                                                    <option value={index} key={index}>{value}</option>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Divider style={{marginBottom: 15}}/>
                                </Hidden>
                                
                                {
                                    state.algorithm !== '' &&
                                    <Grid item>
                                        <Paper className={classes.paper}>
                                            <Hidden xsDown implementation="css">
                                                <Typography variant='h4'>{menus[state.algorithm]}</Typography>
                                            </Hidden>
                                            <Hidden smUp implementation="css">
                                                <Typography variant='h5'>{menus[state.algorithm]}</Typography>
                                            </Hidden>
                                        </Paper>
                                    </Grid>
                                }

                                
                                {  
                                    state.algorithm !== '' && state.algorithm !== '3' &&
                                    <Grid item>
                                        <AlphabetForm algorithm={state.algorithm}/>
                                    </Grid>
                                }

                                {  
                                    state.algorithm !== '' && state.algorithm === '3' &&
                                    <Grid item>
                                        <AsciiForm algorithm={state.algorithm}/>
                                    </Grid>
                                }
                                
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </CssBaseline>
    )
}

export default Home;
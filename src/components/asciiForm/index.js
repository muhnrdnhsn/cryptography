import { Button, Grid, Paper, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import AlphabetForm from '../alphabetForm';
import styles from './styles';

const AsciiForm = ({algorithm}) => {
    const classes = styles();

    const [state, setState] = useState({
        cipher: '',
        plain: '',
        key: '',
        method: 'text',
        plainFile: "",
        cipherFile: ""
    })

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const encrypt = () => {
        if(state.cipherFile){
            setState({
                ...state,
                plainFile: '',
                cipherFile: '',
                key: ''
            })
        }else{
            console.log(algorithm, state.plainFile, state.key);
        }
    }

    const decrypt = () => {
        if(state.plainFile){
            setState({
                ...state,
                plainFile: '',
                cipherFile: '',
                key: ''
            })
        }else{
            console.log(algorithm, state.cipherFile, state.key);
        }
    }

    const download = () => {
        
    }

    return(
        <Grid container spacing={2} direction="column">
            <Grid item>
                <Paper className={classes.paper}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Method</FormLabel>
                        <RadioGroup aria-label="method" row value={state.method} name="method" onChange={handleChange}>
                            <FormControlLabel value="text" control={<Radio />} label="Text" />
                            <FormControlLabel value="file" control={<Radio />} label="File" />
                        </RadioGroup>
                    </FormControl>
                    
                </Paper>
            </Grid>
            
            {
                state.method === 'text' &&
                <Grid item>
                    <AlphabetForm algorithm={algorithm}/>
                </Grid>
            }
                
            {
                state.method === 'file' &&
                <>
                    <Grid item>
                        <Paper className={classes.paper}>
                            <TextField
                                id="key"
                                label="Key"
                                multiline
                                rows={3}
                                variant="outlined"
                                fullWidth
                                onChange={(e)=>{handleChange(e)}}
                                inputProps={{
                                    name: 'key'
                                }}
                                value={state.key}
                            />
                        </Paper>
                    </Grid>
            
                    <Grid item>
                        <Paper className={state.cipherFile ? classes.disabledPaper : classes.paper}>
                            <Grid container direction="row" justify="space-between" alignItems="center">
                            
                                <Grid item xs={12}>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Plain File</FormLabel>
                                    </FormControl>
                                    <label htmlFor="btn-upload-p">
                                        <input
                                            id="btn-upload-p"
                                            name="plainFile"
                                            hidden
                                            type="file"
                                            onChange={handleChange}
                                            disabled={state.cipherFile !== ""}
                                        />
                                        <Button
                                            className="btn-choose"
                                            variant="outlined"
                                            component="span" 
                                            fullWidth
                                            disabled={state.cipherFile !== ""}
                                        >
                                            Pick File
                                        </Button>
                                    </label>
                                    
                                </Grid>

                                <Grid item >
                                    <Typography>{state.plainFile ? ('File name: ' + state.plainFile.split(/\\/)[2]) : 'No file selected'}</Typography>
                                </Grid> 
                            
                            </Grid>
                        </Paper>
                    </Grid>

                    <Grid item>
                        <Paper className={state.plainFile ? classes.disabledPaper : classes.paper}>
                            <Grid container direction="row" justify="space-between" alignItems="center">
                            
                                <Grid item xs={12}>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Cipher File</FormLabel>
                                    </FormControl>
                                    <label htmlFor="btn-upload">
                                        <input
                                            id="btn-upload"
                                            name="cipherFile"
                                            hidden
                                            type="file"
                                            disabled={state.plainFile !== ""}
                                            onChange={handleChange} 
                                            />
                                        <Button
                                            className="btn-choose"
                                            variant="outlined"
                                            component="span" 
                                            fullWidth
                                            disabled={state.plainFile !== ""}
                                        >
                                            Pick File
                                        </Button>
                                    </label>
                                    
                                </Grid>

                                <Grid item >
                                    <Typography>{state.cipherFile ? ('File name: ' + state.cipherFile.split(/\\/)[2]) : 'No file selected'}</Typography>
                                </Grid> 
                            
                            </Grid>
                        </Paper>
                    </Grid>
            
                    <Grid item>
                        <Grid container spacing={2} direction="row" justify="center">
                            {
                                state.plainFile && state.key &&
                                <Grid item xs={3}>
                                    <Button variant="contained" color="primary" fullWidth onClick={()=>encrypt()}>
                                        {state.cipherFile ? 'RESET' : "ENCRYPT"}
                                    </Button>
                                </Grid>
                            }
                            {
                                state.cipherFile && state.key &&
                                <Grid item xs={3}>
                                    <Button variant="contained" color="primary" fullWidth onClick={()=>decrypt()}>
                                        {state.plainFile ? 'RESET' : 'DECRYPT'}
                                    </Button>
                                </Grid>
                            }
                            {
                                state.plainFile && state.cipherFile &&
                                <Grid item xs={3}>
                                    <Button variant="contained" color="primary" fullWidth onClick={()=>download()}>DOWNLOAD</Button>
                                </Grid>
                            }
                        </Grid>
                    </Grid>
                </>
            }
            
        </Grid>
    )
}

export default AsciiForm;
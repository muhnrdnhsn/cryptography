import { Button, Grid, Paper, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import styles from './styles';

const AlphabetForm = ({algorithm}) => {
    const classes = styles();

    const [state, setState] = useState({
        cipher: '',
        plain: '',
        key: ''
    })

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const encrypt = () => {
        console.log(algorithm, state.plain, state.key);
    }

    const decrypt = () => {
        console.log(algorithm, state.cipher, state.key);
    }

    const download = () => {
        
    }

    return(
        <Grid container spacing={2} direction="column">
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
                <Paper className={state.cipher === '' ? classes.paper : classes.disabledPaper}>
                    <TextField
                        id="plaintext"
                        label="Plain Text"
                        multiline
                        rows={5}
                        variant="outlined"
                        fullWidth
                        disabled={state.cipher !== ''}
                        onChange={(e)=>{handleChange(e)}}
                        inputProps={{
                            name: 'plain'
                        }}
                        value={state.plain}
                    />
                </Paper>
            </Grid>

            <Grid item>
                <Paper className={state.plain === '' ? classes.paper : classes.disabledPaper}>
                    <TextField
                        id="ciphertext"
                        label="Cipher Text"
                        multiline
                        rows={5}
                        variant="outlined"
                        fullWidth
                        disabled={state.plain !== ''}
                        onChange={(e)=>{handleChange(e)}}
                        inputProps={{
                            name: 'cipher'
                        }}
                        value={state.cipher}
                    />
                </Paper>
            </Grid>

            <Grid item>
                <Grid container spacing={2} direction="row" justify="center">
                    {
                        state.plain && state.key &&
                        <Grid item xs={3}>
                            <Button variant="contained" color="primary" fullWidth onClick={()=>encrypt()}>ENCRYPT</Button>
                        </Grid>
                    }
                    {
                        state.cipher && state.key &&
                        <Grid item xs={3}>
                            <Button variant="contained" color="primary" fullWidth onClick={()=>decrypt()}>DECRYPT</Button>
                        </Grid>
                    }
                    {
                        state.cipher && state.plain &&
                        <Grid item xs={3}>
                            <Button variant="contained" color="primary" fullWidth onClick={()=>download()}>DOWNLOAD</Button>
                        </Grid>
                    }
                </Grid>
            </Grid>
        </Grid>
    )
}

export default AlphabetForm;
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import { vigenereStandardDec, vigenereStandardEnc } from '../../services/vigenereStandard';
import { getMenu, removeNonAlphabetic } from '../../utils';
import styles from './styles';

const AlphabetForm = ({algorithm}) => {
    const classes = styles();
    const menu = getMenu();

    const [state, setState] = useState({
        cipher: '',
        plain: '',
        key: '',
        algorithm: algorithm
    })

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: removeNonAlphabetic(e.target.value).toUpperCase()
        })
    }

    const encrypt = () => {
        setState({
            ...state,
            cipher: vigenereStandardEnc(state.plain, state.key)
        })
    }

    const decrypt = () => {
        setState({
            ...state,
            plain: vigenereStandardDec(state.cipher, state.key)
        })
    }

    const download = () => {
        //GENERATE FILE CONTENT
        /* FORMAT :
            ALGORITHM   : <ALGORITHM_NAME>
            KEY         : <KEY>
            PLAIN       : <PLAIN>
            CIPHER      : <CIPHER>
        */
        var text = "ALGORITHM\t: "+menu[state.algorithm];
        text += "\nKEY\t\t: "+state.key;
        text += "\nPLAIN\t\t: "+state.plain;
        text += "\nCIPHER\t\t: "+state.cipher;

        //GENERATE FILENAME
        var filename = menu[state.algorithm]+".txt";

        //CREATING DOWNLOAD FILE
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    const reset = () => {
        setState({
            ...state,
            cipher: '',
            plain: '',
            key: ''
        })
    }

    return(
        <Grid container spacing={2} direction="column">
            <Grid item>
                <Paper className={(state.cipher && state.plain) ? classes.disabledPaper : classes.paper}>
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
                        disabled={state.cipher !== '' && state.plain !== ''}
                        value={state.key}
                    />
                    <Typography variant="caption">Input is automatically converted to uppercase and only accepts alphabetic input</Typography>
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
                    <Typography variant="caption">Input is automatically converted to uppercase and only accepts alphabetic input</Typography>
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
                    <Typography variant="caption">Input is automatically converted to uppercase and only accepts alphabetic input</Typography>

                </Paper>
            </Grid>

            <Grid item>
                <Grid container spacing={2} direction="row" justify="center">
                    {
                        state.plain && state.key && !state.cipher &&
                        <Grid item xs={3}>
                            <Button variant="contained" color="primary" fullWidth onClick={()=>encrypt()}>ENCRYPT</Button>
                        </Grid>
                    }
                    {
                        state.cipher && state.key && !state.plain &&
                        <Grid item xs={3}>
                            <Button variant="contained" color="primary" fullWidth onClick={()=>decrypt()}>DECRYPT</Button>
                        </Grid>
                    }
                    {
                        state.cipher && state.key && state.plain &&
                        <Grid item xs={3}>
                            <Button variant="contained" color="primary" fullWidth onClick={()=>reset()}>RESET</Button>
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
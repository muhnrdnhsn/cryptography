import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import { affineEnc, affineDec } from '../../services/afine';
import { playfairDec, playfairEnc } from '../../services/playfair';
import { vigenereAutoKeyEnc, vigenereAutoKeyDec  } from '../../services/vigenereAutokey';
import { vigenereFullDec, vigenereFullEnc } from '../../services/vigenereFull';
import { vigenereStandardDec, vigenereStandardEnc } from '../../services/vigenereStandard';
import { getMenu, getOnlyPositive, removeNonAlphabetic } from '../../utils';
import styles from './styles';

const AlphabetForm = ({algorithm}) => {
    const classes = styles();
    const menu = getMenu();

    useEffect(()=>{
        setState({
            cipher: '',
            plain: '',
            key: '',
            m: '',
            shifting: '',
            algorithm: algorithm
        })
    }, [algorithm])

    const [state, setState] = useState({
        cipher: '',
        plain: '',
        key: '',
        m: '',
        shifting: '',
        algorithm: algorithm
    })

    const handleChange = (e) => {
        if(e.target.name !== 'm' && e.target.name !== 'shifting'){
            setState({
                ...state,
                [e.target.name]: removeNonAlphabetic(e.target.value).toUpperCase()
            })
        }else{
            setState({
                ...state,
                [e.target.name]: getOnlyPositive(e.target.value)
            }) 
        }
    }

    const encrypt = () => {
        var cipherText
        switch (algorithm) {
            case '0':
                cipherText = vigenereStandardEnc(state.plain, state.key)
                break;
            
            case '1':
                cipherText = vigenereFullEnc(state.plain, state.key)
                break;

            case '2':
                cipherText = vigenereAutoKeyEnc(state.plain, state.key)
                break;

            case '4':
                cipherText = playfairEnc(state.plain, state.key)
                break;

            case '5':
                cipherText = affineEnc(state.plain, state.m, state.shifting)
                break;

            default:
                cipherText = ''
                break;
        }

        setState({
            ...state,
            cipher: cipherText
        })
    }

    const decrypt = () => {
        var plainText
        switch (algorithm) {
            case '0':
                plainText = vigenereStandardDec(state.cipher, state.key)
                break;
            
            case '1':
                plainText = vigenereFullDec(state.cipher, state.key)
                break;
                
            case '2':
                plainText = vigenereAutoKeyDec(state.cipher, state.key)
                break;
            
            case '4':
                plainText = playfairDec(state.cipher, state.key)
                break;

            case '5':
                plainText = affineDec(state.cipher, state.m, state.shifting)
                break;

            default:
                plainText = ''
                break;
        }

        setState({
            ...state,
            plain: plainText
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
        var text = "ALGORITHM\t: "+menu[algorithm];
        if(algorithm === '5'){
            text += "\nM\t\t: "+state.m;
            text += '\nB\t\t:'+state.shifting;
        }else{
            text += "\nKEY\t\t: "+state.key;
        }
        text += "\nPLAIN\t\t: "+state.plain;
        text += "\nCIPHER\t\t: "+state.cipher;

        //GENERATE FILENAME
        var filename = menu[algorithm]+".txt";

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
            key: '',
            m: '',
            shifting: '',
            algorithm: algorithm
        })
    }

    return(
        <Grid container spacing={2} direction="column">
            <Grid item>
                <Paper className={(state.cipher && state.plain) ? classes.disabledPaper : classes.paper}>
                    {
                        algorithm !== '5' ?
                        <>
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
                        </>
                        :
                        <>
                            <Grid container direction="column" spacing={2}>
                                <Grid item>
                                    <TextField
                                        id="param-m"
                                        label="Parameter: m"
                                        variant="outlined"
                                        fullWidth
                                        type="number"
                                        onChange={(e)=>{handleChange(e)}}
                                        inputProps={{
                                            name: 'm'
                                        }}
                                        disabled={state.cipher !== '' && state.plain !== ''}
                                        value={state.m}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="param-shifting"
                                        label="Parameter: Shifting"
                                        variant="outlined"
                                        fullWidth
                                        type="number"
                                        onChange={(e)=>{handleChange(e)}}
                                        inputProps={{
                                            name: 'shifting'
                                        }}
                                        disabled={state.cipher !== '' && state.plain !== ''}
                                        value={state.shifting}
                                    />
                                </Grid>
                            </Grid>
                            <Typography variant="caption">Input is  only accepts positive number    input</Typography>
                        </>


                    }
                    
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
                        state.plain  && !state.cipher && (state.key || (state.m && state.shifting)) &&
                        <Grid item xs={3}>
                            <Button variant="contained" color="primary" fullWidth onClick={()=>encrypt()}>ENCRYPT</Button>
                        </Grid>
                    }
                    {
                        state.cipher  && !state.plain && (state.key || (state.m && state.shifting)) &&
                        <Grid item xs={3}>
                            <Button variant="contained" color="primary" fullWidth onClick={()=>decrypt()}>DECRYPT</Button>
                        </Grid>
                    }
                    {
                        state.cipher && state.plain && (state.key || (state.m && state.shifting)) &&
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
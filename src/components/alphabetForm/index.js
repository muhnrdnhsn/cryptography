import { Button, Divider, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import { affineEnc, affineDec } from '../../services/afine';
import { playfairDec, playfairEnc } from '../../services/playfair';
import { rc4 } from '../../services/rc4';
import { vigenereAutoKeyEnc, vigenereAutoKeyDec  } from '../../services/vigenereAutokey';
import { vigenereExtendedEnc, vigenereExtendedDec } from '../../services/vigenereExtended';
import { vigenereFullDec, vigenereFullEnc } from '../../services/vigenereFull';
import { vigenereStandardDec, vigenereStandardEnc } from '../../services/vigenereStandard';
import { getMenu, removeNonAlphabetic, getOnlyPositive } from '../../utils';
// import styles from './styles';

const AlphabetForm = ({algorithm}) => {
    // const classes = styles();
    const menu = getMenu();

    useEffect(()=>{
        setState({
            method: '',
            key: '',
            plain: '',
            cipher2: '',
            cipher: '',
            m: '',
            shifting: '',
            algorithm: algorithm,
        })
    }, [algorithm])

    const [state, setState] = useState({
        method: '',
        key: '',
        plain: '',
        cipher: '',
        cipher2: '',
        m: '',
        shifting: '',
        algorithm: algorithm,
    })
    
    const handleChange = (event) => {
        if(event.target.name === 'method'){
            setState({
                ...state,
                method: event.target.value,
                plain: '',
                cipher2: '',
                cipher: '',
                m: '',
                shifting: ''
            })
        }else if(event.target.name === 'm' || event.target.name === 'shifting'){
            setState({
                ...state,
                [event.target.name]: getOnlyPositive(event.target.value)
            })
        }else{
            if(state.algorithm === 3 || state.algorithm === 6){
                setState({
                    ...state,
                    [event.target.name]: event.target.value
                })
            }else{
                setState({
                    ...state,
                    [event.target.name]: removeNonAlphabetic(event.target.value).toUpperCase()
                })
            }
        }
    }

    const encrypy = () => {
        var cipherText
        switch (algorithm) {
            case 0:
                cipherText = vigenereStandardEnc(state.plain, state.key)
                break;
            
            case 1:
                cipherText = vigenereFullEnc(state.plain, state.key)
                break;

            case 2:
                cipherText = vigenereAutoKeyEnc(state.plain, state.key)
                break;

            case 3:
                cipherText = vigenereExtendedEnc(state.plain, state.key, 'text')
                break;

            case 4:
                cipherText = playfairEnc(state.plain, state.key)
                break;

            case 5:
                cipherText = affineEnc(state.plain, state.m, state.shifting)
                break;

            case 6:
                cipherText = rc4(state.plain, state.key, 'text')
                break;

            default:
                cipherText = ''
                break;
        }
        var cipher2 = cipherText.match(/.{0,5}/g).join(" ")
        setState({
            ...state,
            cipher: cipherText,
            cipher2: cipher2
        })
    }

    const decrypt = () => {
        var plainText
        switch (algorithm) {
            case 0:
                plainText = vigenereStandardDec(state.cipher, state.key)
                break;
            
            case 1:
                plainText = vigenereFullDec(state.cipher, state.key)
                break;
                
            case 2:
                plainText = vigenereAutoKeyDec(state.cipher, state.key)
                break;
            
            case 3:
                plainText = vigenereExtendedDec(state.cipher, state.key, 'text')
                break;

            case 4:
                plainText = playfairDec(state.cipher, state.key)
                break;

            case 5:
                plainText = affineDec(state.cipher, state.m, state.shifting)
                break;

            case 6:
                plainText = rc4(state.cipher, state.key, 'text')
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

    const reset = () => {
        setState({
            ...state,
            method: '',
            key: '',
            plain: '',
            cipher: '',
            cipher2: '',
            m: '',
            shifting: '',
            algorithm: algorithm,
        })
    }

    const handleClick = () => {
        if(state.method === 'encrypt'){
            if(state.cipher){
                reset()
            }else{
                encrypy()
            }
        }else{
            if(state.plain){
                reset()
            }else{
                decrypt()
            }
        }
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
       text += "\nCIPHER\t\t: "+state.cipher2;
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

    return(
        <Grid container spacing={2} direction="column">
            <Grid item>
                <FormLabel component="legend">Method</FormLabel>
                <FormControl>
                    <RadioGroup aria-label="method" name="method" value={state.method} onChange={handleChange}>
                        <FormControlLabel value="encrypt" control={<Radio />} label="Encrypt" />
                        <FormControlLabel value="decrypt" control={<Radio />} label="Decrypt" />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Divider/>
            <Grid item>
                {
                    (state.algorithm === 5) &&
                    <>
                        <Typography variant="caption">Input is  only accepts positive number    input</Typography>
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
                                    style={{marginTop: 10}}
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
                    </>
                }
                {
                    (state.algorithm !== 5 && state.algorithm !== 3 && state.method) &&
                    <Typography variant="caption">Alphabetic Only and Auto Convert into Uppercase</Typography>
                }
                {   
                    state.algorithm !== 5 && state.method &&
                    <FormControl fullWidth>
                        <TextField
                            id="key"
                            multiline
                            rows={3}
                            variant="outlined"
                            fullWidth
                            label="Key"
                            onChange={(e)=>{handleChange(e)}}
                            inputProps={{
                                name: 'key'
                            }}
                            disabled={state.cipher !== '' && state.plain !== ''}
                            value={state.key}
                            style={{marginTop: 10}}
                        />
                    </FormControl>
                }
            </Grid>
            <Grid item>
                {
                    state.method === 'encrypt' &&
                    <TextField
                        id="plaintext"
                        label="Plain Text"
                        multiline
                        rows={3}
                        variant="outlined"
                        fullWidth
                        disabled={state.cipher !== ''}
                        onChange={(e)=>{handleChange(e)}}
                        inputProps={{
                            name: 'plain'
                        }}
                        value={state.plain}
                    />
                }
                {
                    state.method === 'decrypt' &&
                    <TextField
                        id="ciphertext"
                        label="Cipher Text"
                        multiline
                        rows={3}
                        variant="outlined"
                        fullWidth
                        disabled={state.plain !== ''}
                        onChange={(e)=>{handleChange(e)}}
                        inputProps={{
                            name: 'cipher'
                        }}
                        value={state.cipher}
                    />
                }
                {
                    (state.algorithm === 5 && state.method) &&
                    <Typography variant="caption">Alphabetic Only and Auto Convert into Uppercase</Typography>
                }
            </Grid>
            {
                state.method &&
                <Divider/>
            }
            {
                state.method === 'encrypt' && state.cipher &&
                <>
                    <Grid item>
                        <TextField
                            id="ciphertext"
                            label="Cipher Text"
                            multiline
                            rows={3}
                            variant="outlined"
                            fullWidth
                            disabled={state.plain !== ''}
                            onChange={(e)=>{handleChange(e)}}
                            inputProps={{
                                name: 'cipher'
                            }}
                            value={state.cipher}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="ciphertext2"
                            label="Cipher Text (5 Char Split)"
                            multiline
                            rows={3}
                            variant="outlined"
                            fullWidth
                            disabled={state.plain !== ''}
                            onChange={(e)=>{handleChange(e)}}
                            inputProps={{
                                name: 'cipher2'
                            }}
                            value={state.cipher2}
                        />
                    </Grid>
                    <Divider/>
                </>
            }
            {
                state.method === 'decrypt' && state.plain &&
                <>
                    <Grid item>
                        <TextField
                            id="plaintext"
                            label="Plain Text"
                            multiline
                            rows={3}
                            variant="outlined"
                            fullWidth
                            disabled={state.cipher !== ''}
                            onChange={(e)=>{handleChange(e)}}
                            inputProps={{
                                name: 'plain'
                            }}
                            value={state.plain}
                        />
                    </Grid>
                    <Divider/>
                </>
            }
            <Grid item>
                <Grid container spacing={2} direction="row" justify="center">
                    {
                        state.method && (state.cipher || state.plain) &&
                        <Grid item xs={3}>
                            <Button variant="contained" color="primary" fullWidth onClick={()=>handleClick()}>{state.cipher && state.plain ? 'RESET' : state.method.toUpperCase()}</Button>
                        </Grid>
                    }
                    
                    {
                        state.cipher && state.plain && state.method &&
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
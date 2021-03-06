import { Button, Grid, Paper, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography, Divider } from '@material-ui/core';
import React, { useState } from 'react'
import { modifiedrc4 } from '../../services/modifiedRC4';
import { rc4 } from '../../services/rc4';
import { vigenereExtendedDec, vigenereExtendedEnc } from '../../services/vigenereExtended';
import AlphabetForm from '../alphabetForm';
import styles from './styles';

const AsciiForm = ({algorithm}) => {
    const classes = styles();

    const [state, setState] = useState({
        cipher: '',
        plain: '',
        key: '',
        type: 'text',
        method: '',
        plainFile: "",
        cipherFile: "",
        algorithm: algorithm
    })

    const handleChange = (e) => {
        if(e.target.name === 'plainFile' || e.target.name === 'cipherFile'){
            setState({
                ...state,
                [e.target.name]: e.target.files[0]
            })
        }else if(e.target.name === 'method'){
            setState({
                ...state,
                cipher: '',
                plain: '',
                method: e.target.value,
                plainFile: "",
                cipherFile: ""
            })
        }else{
            setState({
                ...state,
                [e.target.name]: e.target.value
            })
        }
        
    }

    const reset = () => {
        setState({
            ...state,
            cipher: '',
            plain: '',
            key: '',
            type: 'text',
            method: '',
            plainFile: "",
            cipherFile: "",
            algorithm: algorithm
        })
    }

    const handleClick = () => {
        if(state.cipherFile){
            if(state.plain){
                reset()
            }else{
                decrypt()
            }
        }else if(state.plainFile){
            if(state.cipher){
                reset()
            }else{
                encrypt()
            }
        }
    }

    const convertFile = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            }

            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    const encrypt = async () => {
        const base64 = await convertFile(state.plainFile);
        var cipher

        switch (state.algorithm) {
            case 3:
                cipher = vigenereExtendedEnc(new Uint8Array(base64), state.key, 'file')
                break;

            case 6:
                cipher = rc4(new Uint8Array(base64), state.key, 'file')
                break;

            case 7:
                cipher = modifiedrc4(new Uint8Array(base64), state.key, 'file')
                break;

            default:
                cipher = ''
                break;
        }

        setState({
            ...state,
            cipher: cipher
        })
        
    }

    const decrypt = async () => {
        const base64 = await convertFile(state.cipherFile);
        var plain = ''
        switch (state.algorithm) {
            case 3:
                plain = vigenereExtendedDec(new Uint8Array(base64), state.key, 'file')
                break;

            case 6:
                plain = rc4(new Uint8Array(base64), state.key, 'file')
                break;

            case 7:
                plain = modifiedrc4(new Uint8Array(base64), state.key, 'file')
                break;

            default:
                plain = ''
                break;
        }
        setState({
            ...state,
            plain: plain
        })
    }

    const download = () => {
        var uint8
        var file
        var newFileName
        
        if(state.cipher){
            uint8 = state.cipher
            file = state.plainFile
            newFileName = 'enc_' + file.name

        }else{
            uint8 = state.plain
            file = state.cipherFile
            newFileName = file.name
        }

        var data = new Int8Array(uint8).buffer;

        var newFile = new Blob([data], { type: file.type });
        if (window.navigator.msSaveOrOpenBlob)
            window.navigator.msSaveOrOpenBlob(newFile, newFileName);
        else {
            var a = document.createElement("a"),
                url = URL.createObjectURL(newFile);
            a.href = url;
            a.download = newFileName;
            document.body.appendChild(a);
            a.click();
            setTimeout(function () {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        } 
    }

    return(
        <Grid container spacing={2} direction="column">
            <Grid item>
                <Paper className={classes.paper}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Input Type</FormLabel>
                        <RadioGroup aria-label="type" row value={state.type} name="type" onChange={handleChange}>
                            <FormControlLabel value="text" control={<Radio />} label="Text" />
                            <FormControlLabel value="file" control={<Radio />} label="File" />
                        </RadioGroup>
                    </FormControl>
                    
                </Paper>
            </Grid>
            
            {
                state.type === 'text' &&
                <Grid item>
                    <AlphabetForm algorithm={algorithm}/>
                </Grid>
            }

            
            {
                state.type === 'file' &&
                <>
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
                    {
                        state.method &&
                        <Grid item>
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
                        </Grid>
                    }
                    {
                        state.method === 'encrypt' &&
                        <Grid item>
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
                                    <Typography>{state.plainFile ? ('File name: ' + state.plainFile.name) : 'No file selected'}</Typography>
                                </Grid> 
                            
                            </Grid>
                        </Grid>
                    }
                    {
                        state.method === 'decrypt' &&
                        <Grid item>
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
                                    <Typography>{state.cipherFile ? ('File name: ' + state.cipherFile.name) : 'No file selected'}</Typography>
                                </Grid> 
                            
                            </Grid>
                        </Grid>
                    }
                    {
                        state.method && <Divider/>
                    }
                    <Grid item>
                        <Grid container spacing={2} direction="row" justify="center">
                            {
                                state.plainFile && state.key &&
                                <Grid item xs={3}>
                                    <Button variant="contained" color="primary" fullWidth onClick={()=>handleClick()}>
                                        {state.cipher ? 'RESET' : "ENCRYPT"}
                                    </Button>
                                </Grid>
                            }
                            {
                                state.cipherFile && state.key &&
                                <Grid item xs={3}>
                                    <Button variant="contained" color="primary" fullWidth onClick={()=>handleClick()}>
                                        {state.plain ? 'RESET' : 'DECRYPT'}
                                    </Button>
                                </Grid>
                            }
                            {
                                ((state.plainFile && state.cipher) || (state.cipherFile && state.plain)) &&
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
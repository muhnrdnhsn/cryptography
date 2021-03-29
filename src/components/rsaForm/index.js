import { Button, Grid, Paper, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import { rsadecrypt, rsaencrypt } from '../../services/rsa';
import styles from './styles';
var bigIntConversion = require('bigint-conversion')

const RSAForm = ({algorithm}) => {
    const classes = styles();

    const [state, setState] = useState({
        keycontent1: '',
        keycontent2: '',
        result: '',
        key: '',
        type: '',
        method: 'Encrypt',
        keytype: "",
        keyFile: "",
        algorithm: algorithm,
        content: '',
        contentFile: ''
    })

    const handleChange = async (e) => {
        if(e.target.name === 'contentFile'){
            var content = await convertFile(e.target.files[0])
            console.log(e.target.files[0].type)
            var uint8 = new Uint8Array(content)
            setState({
                ...state,
                [e.target.name]: e.target.files[0],
                content: uint8
            })
        }else if(e.target.name === 'keyFile'){
            var keys = await readKeyFile(e.target.files[0])
            keys = keys.split(", ")
            setState({
                ...state,
                [e.target.name] : e.target.files[0],
                keycontent1: keys[0],
                keycontent2: keys[1]
            })
            
        }else if(e.target.name === 'method'){
            setState({
                ...state,
                keycontent1: '',
                keycontent2: '',
                type: '',
                method: e.target.value,
                contentFile: "",
                keyFile: "",
                keytype: "",
                content: '',
                result: ''
            })
        }else if(e.target.name === 'keycontent1' || e.target.name === 'keycontent2'){
            setState({
                ...state,
                [e.target.name] : e.target.value.replace(/[^0-9]/gi, '')
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
            keycontent1: '',
            keycontent2: '',
            result: '',
            key: '',
            type: '',
            method: 'Encrypt',
            contentFile: "",
            keytype: "",
            algorithm: algorithm,
            content: '',
            keyFile: ""
        })
    }

    const handleClick = async () => {
        if(state.method === 'Encrypt'){
            let result = rsaencrypt(state.type, state.content, state.keycontent1, state.keycontent2)
            // if(state.type === 'text')
            // {
            //     result = rsaencrypt(state.content, state.keycontent1, state.keycontent2)
            // }else{
            //     const base64 = await convertFile(state.contentFile);
            //     result = rsaencrypt(new Uint8Array(base64), state.keycontent1, state.keycontent2)
            // }
            setState({
                ...state,
                result: result
            })
        }else{
            let result = rsadecrypt(state.type, state.content, state.keycontent1, state.keycontent2)
            // if(state.type === 'text')
            // {
            //     result = rsadecrypt(state.content, state.keycontent1, state.keycontent2)
            // }else{
            //     const base64 = await convertFile(state.contentFile);
            //     result = rsadecrypt(new Uint8Array(base64), state.keycontent1, state.keycontent2)
            // }
            setState({
                ...state,
                result: result
            })
        }
    }

    const readKeyFile = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsText(file, "UTF-8");

            fileReader.onload = (e) => {
                resolve(e.target.result);
            }

            fileReader.onerror = (error) => {
                reject(error);
            }
        })
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

    const download = () => {
        let type, ext, data
        if(state.type === 'text')
        {
            type = 'text/plain'
            ext = 'RSA-text.txt'
            data = state.result
        }
        else
        {
            type = state.contentFile.type
            ext = state.contentFile.name
            if(state.method === 'Encrypt'){
                data = state.result.split('\\x').map((i)=>{
                    if(i === ''){
                        return ''
                    }else{
                        return(bigIntConversion.hexToBigint(i).toString())
                    }
                })
                console.log('download:'+ new Uint8Array(data))
                data = new Uint8Array(data).buffer

            }else{
                data = state.result
            }
        }
        const element = document.createElement("a");
        const file = new Blob([data], {type: type});
        element.href = URL.createObjectURL(file);
        element.download = ext;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
        // var uint8
        // // var file
        // var newFileName
        
        // uint8 = state.result
        // // file = state.contentFile
        // newFileName = 'RSA.txt'
        

        // var data = new Int8Array(uint8).buffer;

        // var newFile = new Blob([data], { type: 'text/plain' });
        // if (window.navigator.msSaveOrOpenBlob)
        //     window.navigator.msSaveOrOpenBlob(newFile, newFileName);
        // else {
        //     var a = document.createElement("a"),
        //         url = URL.createObjectURL(newFile);
        //     a.href = url;
        //     a.download = newFileName;
        //     document.body.appendChild(a);
        //     a.click();
        //     setTimeout(function () {
        //         document.body.removeChild(a);
        //         window.URL.revokeObjectURL(url);
        //     }, 0);
        // } 
    }

    return(
        <Grid container spacing={2} direction="column">
            <Paper className={classes.paper}>
                <Grid item>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Method</FormLabel>
                        <RadioGroup aria-label="method" row value={state.method} name="method" onChange={handleChange}>
                            <FormControlLabel value="Encrypt" control={<Radio />} label="Encrypt" />
                            <FormControlLabel value="Decrypt" control={<Radio />} label="Decrypt" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Paper>

            <Paper className={classes.paper}>
                <Grid item>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Input Type</FormLabel>
                        <RadioGroup aria-label="type" row value={state.type} name="type" onChange={handleChange}>
                            <FormControlLabel value="text" control={<Radio />} label="Text" />
                            <FormControlLabel value="file" control={<Radio />} label="File" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                {
                    state.type === 'text' &&
                    <TextField
                        id='content'
                        label={state.method === 'Encrypt' ? 'Plain Text' : 'Cipher Text'}
                        multiline
                        rows={2}
                        variant="outlined"
                        fullWidth
                        onChange={(e)=>{handleChange(e)}}
                        inputProps={{
                            name: 'content'
                        }}
                        value={state.content}
                    />
                }
                {
                    state.type === 'file' &&
                    <Grid item>
                        <Grid container direction="row" justify="space-between" alignItems="center">
                            <Grid item xs={12}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">{state.method === 'Encrypt' ? 'Plain' : 'Cipher'} File</FormLabel>
                                </FormControl>
                                <label htmlFor="btn-upload-p">
                                    <input
                                        id="btn-upload-p"
                                        name="contentFile"
                                        hidden
                                        type="file"
                                        onChange={handleChange}
                                        disabled={state.contentFile !== ""}
                                    />
                                    <Button
                                        className="btn-choose"
                                        variant="outlined"
                                        component="span" 
                                        fullWidth
                                        disabled={state.contentFile !== ""}
                                    >
                                        Pick File
                                    </Button>
                                </label>
                                
                            </Grid>

                            <Grid item >
                                <Typography>{state.contentFile ? ('File name: ' + state.contentFile.name) : 'No file selected'}</Typography>
                            </Grid> 
                        
                        </Grid>
                    </Grid>
                }
            </Paper>

            <Paper className={classes.paper}>
                <Grid item>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Key Type</FormLabel>
                        <RadioGroup aria-label="keytype" row value={state.keytype} name="keytype" onChange={handleChange}>
                            <FormControlLabel value="text" control={<Radio />} label="Text" />
                            <FormControlLabel value="file" control={<Radio />} label="File" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                {
                    state.keytype === 'file' &&
                    <Grid item>
                        <Grid container direction="row" justify="space-between" alignItems="center">
                            <Grid item xs={12}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Receiver {state.method === 'Encrypt' ? 'Public' : 'Private'} File</FormLabel>
                                </FormControl>
                                <label htmlFor="key-file-upload">
                                    <input
                                        id="key-file-upload"
                                        name="keyFile"
                                        hidden
                                        type="file"
                                        onChange={handleChange}
                                        disabled={state.keyFile !== ""}
                                    />
                                    <Button
                                        className="btn-choose"
                                        variant="outlined"
                                        component="span" 
                                        fullWidth
                                        disabled={state.keyFile !== ""}
                                    >
                                        Pick File
                                    </Button>
                                </label>
                                
                            </Grid>

                            <Grid item >
                                <Typography>{state.keyFile ? ('File name: ' + state.keyFile.name) : 'No file selected'}</Typography>
                            </Grid> 
                        
                        </Grid>
                    </Grid>
                }
                {
                   (( state.keytype === 'text') || ( state.keycontent1 && state.keycontent2)) &&
                    <>
                        <Grid item>
                            <TextField
                            id='keycontent1'
                            label={state.method === 'Encrypt' ? 'Receiver Public Key (e)' : 'Receiver Private Text (d)'}
                            multiline
                            rows={2}
                            variant="outlined"
                            fullWidth
                            onChange={(e)=>{handleChange(e)}}
                            inputProps={{
                                name: 'keycontent1'
                            }}
                            disabled={state.keytype === 'file'}
                            value={state.keycontent1}
                            />
                        </Grid>
                        <Grid item style={{marginTop: 10}}>
                            <TextField
                            id='keycontent2'
                            label={state.method === 'Encrypt' ? 'Receiver Public Key (n)' : 'Receiver Private Text (n)'}
                            multiline
                            rows={2}
                            variant="outlined"
                            fullWidth
                            onChange={(e)=>{handleChange(e)}}
                            inputProps={{
                                name: 'keycontent2'
                            }}
                            disabled={state.keytype === 'file'}
                            value={state.keycontent2}
                            />
                        </Grid>
                        <Grid item>
                            <Typography variant="caption">Input is  only accepts number</Typography>
                        </Grid>
                    </>
                }
            </Paper>
            {
                state.result &&
                <Grid item>
                    <TextField
                        id='result'
                        label='Result'
                        multiline
                        rows={2}
                        variant="outlined"
                        fullWidth
                        // onChange={(e)=>{handleChange(e)}}
                        inputProps={{
                            name: 'result'
                        }}
                        disabled
                        value={state.result}
                        />
                </Grid>
            }
            <Grid item>
                <Grid container spacing={2} direction="row" justify="center">
                    {
                        (state.content || state.contentFile || state.keycontent1 || state.keycontent2) &&
                        <Grid item xs={3}>
                            <Button variant="contained" color="primary" fullWidth onClick={()=>reset()}>
                                RESET
                            </Button>
                        </Grid>
                    }
                    {
                        (state.content || state.contentFile) && state.keycontent1 && state.keycontent2 &&
                        <Grid item xs={3}>
                            <Button variant="contained" color="primary" fullWidth onClick={()=>handleClick()}>
                                {state.method}
                            </Button>
                        </Grid>
                    }
                    {
                        (state.result) &&
                        <Grid item xs={3}>
                            <Button variant="contained" color="primary" fullWidth onClick={()=>download()}>DOWNLOAD</Button>
                        </Grid>
                    }
                </Grid>
            </Grid>
        </Grid>
    )
}

export default RSAForm;
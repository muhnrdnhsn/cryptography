import { Button, Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { rsapubprikey } from '../../services/rsa/index';

const GenerateForm = ({algorithm}) => {

    const [state, setState] = useState({
        generated: '',
        pubkey: "",
        prikey: "",
        algorithm: algorithm
    })

    const reset = () => {
        setState({
            generated: '',
            pubkey: "",
            prikey: "",
            algorithm: algorithm
        })
    }

    const handleClick = () => {
        if(state.generated){
            reset()
        }else{
            generate()
        }
    }

    const generate = () => {
        var pairkeyrsa = [];

        pairkeyrsa = rsapubprikey();

        var pubkey = pairkeyrsa[1].toString() + ", " + pairkeyrsa[0].toString();
        var prikey = pairkeyrsa[2].toString() + ", " + pairkeyrsa[0].toString();

        var generated = true;

        setState({
            ...state,
            generated: generated,
            pubkey: pubkey,
            prikey: prikey
        })
    }

    const download = (type) => {
        var content = state.pubkey;
        var filename = "RSA.pub";

        if(type === 'pri')
        {
            content = state.prikey
            filename = "RSA.pri"
        }

        //CREATING DOWNLOAD FILE
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    return(
        <Grid item>
            <Grid container spacing={2} direction="column" justify="center">
            {
                (state.generated) &&
                <>
                    <Grid item>
                        <TextField
                            id="pubkey"
                            label="Public Key"
                            variant="outlined"
                            fullWidth
                            multiline
                            // onChange={(e)=>{handleChange(e)}}
                            inputProps={{
                                name: 'pubkey'
                            }}
                            disabled
                            value={state.pubkey}
                            style={{marginTop: 10}}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="prikey"
                            label="Private Key"
                            variant="outlined"
                            fullWidth
                            multiline
                            // onChange={(e)=>{handleChange(e)}}
                            inputProps={{
                                name: 'private'
                            }}
                            disabled
                            value={state.prikey}
                        />
                    </Grid>
                </>
            }
                <Grid container spacing={2} direction="row" justify="center">
                    {
                        <Grid item xs={3}>
                            <Button variant="contained" color="primary" fullWidth onClick={()=>handleClick()}>
                                {state.generated ? 'RESET' : "GENERATE KEY"}
                            </Button>
                        </Grid>
                    }
                    {
                        (state.generated) &&
                        <Grid item xs={3}>
                            <Button variant="contained" color="primary" fullWidth onClick={()=>download('pub')}>SAVE PUBKEY</Button>
                        </Grid>
                    }
                    {
                        (state.generated) &&
                        <Grid item xs={3}>
                            <Button variant="contained" color="primary" fullWidth onClick={()=>download('pri')}>SAVE PRIKEY</Button>
                        </Grid>
                    }
                </Grid>
            </Grid>
        </Grid>
    )
}

export default GenerateForm;
import { Button, Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { rsa, rsapubprikey } from '../../services/rsa/index';

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

        var pubkey = pairkeyrsa[1].toString() + "," + pairkeyrsa[0].toString();
        var prikey = pairkeyrsa[2].toString() + "," + pairkeyrsa[0].toString();

        var generated = true;

        setState({
            ...state,
            generated: generated,
            pubkey: pubkey,
            prikey: prikey
        })
    }

    const download = () => {
        var pubkey = state.pubkey;
        var prikey = state.prikey;
        var pubkeyFileName = "cryptoons.pub";
        var prikeyFileName = "cryptoons.pri";

        //CREATING DOWNLOAD FILE
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(pubkey));
        element.setAttribute('download', pubkeyFileName);

        var element2 = document.createElement('a');
        element2.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(prikey));
        element2.setAttribute('download', prikeyFileName);

        element.style.display = 'none';
        element2.style.display = 'none';
        document.body.appendChild(element);
        document.body.appendChild(element2);

        element.click();
        element2.click();

        document.body.removeChild(element);
        document.body.removeChild(element2);
    }

    return(
        <Grid item>
            <Grid container spacing={2} direction="column" justify="center">
            {
                (state.generated) &&
                <Typography>{'Generating success!'}</Typography>
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
                            <Button variant="contained" color="primary" fullWidth onClick={()=>download()}>DOWNLOAD</Button>
                        </Grid>
                    }
                </Grid>
            </Grid>
        </Grid>
    )
}

export default GenerateForm;
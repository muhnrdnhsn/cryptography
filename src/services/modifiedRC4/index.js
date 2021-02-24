import { binary2dec, dec2binary } from "../../utils"

const lfsr = (seed) => {
    //I.S. seed is a seed number (0-255 or 8-bit)
    //F.S. generate random number using LFSR with seed

    //LFSR diagram:
    /*
        idx:   0    1    2    3    4    5    6    7
             +----+----+----+----+----+----+----+----+
        +--> | b8 | b7 | b6 | b5 | b4 | b3 | b2 | b1 |--->
        |    +----+----+----+----+----+----+----+----+
        |                 |         |              |
        |                 v         v              |
        +----------------(+)<------(+)<------------+
    
    */
    
    //Initialize register
    var b = dec2binary(seed, 8);

    var result = ""

    //LFSR Process
    for(var i=0; i<8; i++){
        //Generating new bit
        let b8 = b[2] ^ (b[4] ^ b[7])

        //Insert New bit
        b = b8 + b;

        //Get Last bit
        result += b[8]

        //Shifting
        b = b.substr(0, 8)
    }


    //Converting into decimal
    result = binary2dec(result)

    return(result)
}

const modifiedksa = (key) => {
    //I.S. key is an array of ascii code of char of key text
    //F.S. return a new array mutated by the modified KSA
    //modification: key shift by 3
    
    //key-encrypted

    //Array initialize
    //S : [0, 1, 2, ..., 2565]
    var S = []
    for(let i=0; i<256; i++){
        S.push(i)
    }

    var j = 0
    for(let k=0; k<key.length; k++){
        for(let i=0; i<256; i++){
            j = (j + S[i] + key[(i+k) % key.length]) % 256
    
            //Swapping S[i] and S[j]
            let temp = S[i]
            S[i] = S[j]
            S[j] = temp
        }
    }

    return(S)
}


const modifiedprga = (plain, S) => {
    //I.S.  plain is an array of ascii code of plain text
    //      s is an array of result from key scheduling algorithm
    //F.S.  an array of ascii code of cipher text
    //modification: keystream in prga is used for LFSR seed

    var cipher = [];
    var i = 0;
    var j = 0;
    for(var idx=0; idx<plain.length; idx++){
        i = (i + 1) % 256;
        j = (j + S[i]) % 256;

        //Swapping S[i] and S[j]
        let temp = S[i];
        S[i] = S[j];
        S[j] = temp;

        //KEYSTREAM FOR SEED LFSR
        let t = S[((S[i] + S[j]) % 256)];

        //KEYSTREAM
        let u = lfsr(t)

        //Cipher char
        cipher.push(plain[idx] ^ u);
    }

    return(cipher)
}

export const modifiedrc4 = (text, key, method) => {
    //I.S.  text is a string (plain/cipher text)
    //      key is a string (key string)
    //F.S.  text (plain/cipher text encrypted/decrypted with RC4 algorithm)

    //Convert plain and key into an array of ascii code
    var textCodes = [];
    var keyCodes = [];
    if(method === 'text'){
        for(let i=0; i<text.length; i++){
            textCodes.push(text.charCodeAt(i))
        }
    }else{
        textCodes = text
    }

    for(let i=0; i<key.length; i++){
        keyCodes.push(key.charCodeAt(i))
    }

    //KSA
    var S = modifiedksa(keyCodes);

    var resultCodes = modifiedprga(textCodes, S);

    //Converting cipher code into a string
    var result = ''
    if(method === 'text'){
        for(let i=0; i<resultCodes.length; i++){
            result += String.fromCharCode(resultCodes[i])
        }
    }else{
        result = resultCodes;
    }

    return result
}
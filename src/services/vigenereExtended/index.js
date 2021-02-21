import { asciiSubCipherEnc, asciiSubCipherDec } from "../../utils"

export const vigenereExtendedEnc = (plain, key, method) => {

    var plainBytes;
    if(method !== 'file'){
        plainBytes = []
        for(let i=0; i<plain.length; i++){
            plainBytes.push(plain.charCodeAt(i));
        }
        plainBytes = new Uint8Array(plainBytes)
    }else{
        plainBytes = plain
    }

    //INITIALIZE CIPHER
    var cipherBytes = []

    for(let i=0; i<plainBytes.length; i++){
        //GENERATING KEY
        //KEY IS AN IDX OF CHAR[i] IN ASCII CODE
        //MOD OPERATION IS FOR HANDLING PERIODICALLY LOOP KEY
        //EXAMPLE: IN STRING SONY, CHAT AT 5 = CHAR AT 0
        let k = key.charCodeAt(i%key.length)
        cipherBytes.push(asciiSubCipherEnc(plainBytes[i], k))
    }
    var cipher
    if(method !== 'file'){
        cipher = ''
        for(let i=0; i<cipherBytes.length; i++){
            cipher += String.fromCharCode(cipherBytes[i])
        }
    }else{
        cipher = new Uint8Array(cipherBytes)
    }

    return cipher
}

export const vigenereExtendedDec = (cipher, key, method) => {

    var cipherBytes
    if(method !== 'file'){
        cipherBytes = []
        for(let i=0; i<cipher.length; i++){
            cipherBytes.push(cipher.charCodeAt(i));
        }
        cipherBytes = new Uint8Array(cipherBytes)
    }else{
        cipherBytes = cipher
    }

    var plainBytes = []
    for(let i=0; i<cipherBytes.length; i++){
        //GENERATING KEY
        //KEY IS AN IDX OF CHAR[i] IN ASCII CODE
        //MOD OPERATION IS FOR HANDLING PERIODICALLY LOOP KEY
        //EXAMPLE: IN STRING SONY, CHAR AT 5 = CHAR AT 0
        let k = key.charCodeAt(i%key.length)
        plainBytes.push(asciiSubCipherDec(cipherBytes[i], k))
    }
    plainBytes = new Uint8Array(plainBytes)
    var plain
    if(method !== 'file'){
        plain = ''
        for(let i=0; i<plainBytes.length; i++){
            plain += String.fromCharCode(plainBytes[i])
        }
    }else{
        plain = new Uint8Array(plainBytes)
    }

    return plain
}
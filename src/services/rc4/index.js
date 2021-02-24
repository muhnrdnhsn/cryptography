const ksa = (key) => {
    //I.S. key is an array of ascii code of char of key text
    //F.S. return a new array mutated by the KSA

    //Array initialize
    //S : [0, 1, 2, ..., 2565]
    var S = []
    for(let i=0; i<256; i++){
        S.push(i)
    }

    var j = 0
    for(let i=0; i<256; i++){
        j = (j + S[i] + key[i % key.length]) % 256

        //Swapping S[i] and S[j]
        let temp = S[i]
        S[i] = S[j]
        S[j] = temp
    }

    return(S)
}


const prga = (plain, S) => {
    //I.S.  plain is an array of ascii code of plain text
    //      s is an array of result from key scheduling algorithm
    //F.S.  an array of ascii code of cipher text

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

        //KEYSTREAM
        let u = S[((S[i] + S[j]) % 256)];

        //Cipher char
        cipher.push(plain[idx] ^ u);
    }

    return(cipher)
}

export const rc4 = (text, key, method) => {
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
    var S = ksa(keyCodes);

    var resultCodes = prga(textCodes, S);

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
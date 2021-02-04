import { alphabetSubsCipherEnc, alphabetSubsCipherDec } from "../../utils"

export const vigenereStandardEnc = (plain, key) => {
    //I.S PLAIN AND KEY ARE DEFINE
    //F.S RETURN A STRING WHICH IS A ENCRYPTED STRING BY VIGENERE STANDARD ALGORITHM
    //PLAIN IS AN ANY STRING
    //KEY IS AN ANY STRING

    //CONVERT TO UPPERCASE
    plain = plain.toUpperCase()
    key = key.toUpperCase()
    
    //INITIALIZE CIPHER
    var cipher = ""
    //CIPHER GENERATING
    //FOR EACH CHARACTER IN PLAIN, SUBSTITUTE CIPHER WITH KEY IN THE SAME IDX WITH THAT CHAR
    for(var i=0; i<plain.length; i++){
        //GENERATING KEY
        //KEY IS AN IDX OF CHAR[i] IN ALPHABET 
        //MOD OPERATION IS FOR HANDLING PERIODICALLY LOOP KEY
        //EXAMPLE: IN STRING SONY, CHAR AT 5 = CHAR AT 0
        let k = key.charCodeAt((i%key.length))-65
        cipher+= alphabetSubsCipherEnc(plain[i], k)
    }
    return cipher
}

export const vigenereStandardDec = (cipher, key) => {
    //I.S CIPHER AND KEY ARE DEFINE
    //F.S RETURN A STRING WHICH IS A DECRYPTED STRING BY VIGENERE STANDARD ALGORITHM
    //CIPHER IS AN ANY STRING
    //KEY IS AN ANY STRING

    //CONVERT TO UPPERCASE
    cipher = cipher.toUpperCase();
    key = key.toUpperCase();
    
    //INITIALIZE PLAIN
    var plain = ""
    for(var i=0; i<cipher.length; i++){
        //GENERATING KEY
        //KEY IS AN IDX OF CHAR[i] IN ALPHABET 
        //MOD OPERATION IS FOR HANDLING PERIODICALLY LOOP KEY
        //EXAMPLE: IN STRING SONY, CHAR AT 5 = CHAR AT 0
        let k = key.charCodeAt((i%key.length))-65
        plain+= alphabetSubsCipherDec(cipher[i], k)
    }

    return plain
}
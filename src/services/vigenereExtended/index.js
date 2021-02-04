import { asciiSubCipherEnc, asciiSubCipherDec } from "../../utils"

export const vigenereExtendedEnc = (plain, key) => {
    //I.S PLAIN AND KEY ARE DEFINE
    //F.S RETURN A STRING WHICH IS A ENCRYPTED STRING BY VIGENERE EXTENDED ALGORITHM
    //PLAIN IS AN ANY STRING
    //KEY IS AN ANY STRING

    //INITIALIZE CIPHER
    var cipher = ""
    //CIPHER GENERATING
    //FOR EACH CHARACTER IN PLAIN, SUBSTITUTE CIPHER WITH KEY IN THE SAME IDX WITH THAT CHAT
    for(var i=0; i<plain.length; i++){
        //GENERATING KEY
        //KEY IS AN IDX OF CHAR[i] IN ASCII CODE
        //MOD OPERATION IS FOR HANDLING PERIODICALLY LOOP KEY
        //EXAMPLE: IN STRING SONY, CHAT AT 5 = CHAR AT 0
        let k = key.charCodeAt(i%key.length)
        cipher += asciiSubCipherEnc(plain[i], k)
    }
    return cipher
}

export const vigenereExtendedDec = (cipher, key) => {
    //I.S CIPHER AND KEY ARE DEFINE
    //F.S RETURN A STRING WHICH IS A DECRYPTED STRING BY VIGENERE EXTENDED ALGORITHM
    //CIPHER IS AN ANY STRING
    //KEY IS AN ANY STRING
    
    //INITIALIZE PLAIN
    var plain = ""
    for(var i=0; i<cipher.length; i++){
        //GENERATING KEY
        //KEY IS AN IDX OF CHAR[i] IN ASCII CODE
        //MOD OPERATION IS FOR HANDLING PERIODICALLY LOOP KEY
        //EXAMPLE: IN STRING SONY, CHAR AT 5 = CHAR AT 0
        let k = key.charCodeAt(i%key.length)
        plain+= asciiSubCipherDec(cipher[i], k)
    }

    return plain
}
import { alphabetSubsCipherEnc, alphabetSubsCipherDec } from "../../utils"

export const vigenereAutoKeyEnc = (plain, key) => {
    //I.S PLAIN AND KEY ARE DEFINE
    //F.S RETURN A STRING WHICH IS A ENCRYPTED STRING BY VIGENERE STANDARD ALGORITHM
    //PLAIN IS AN ANY STRING
    //KEY IS AN ANY STRING
    //IF KEY IS SHORTEN THAN PLAIN, PLAIN WILL ADD INTO KEY

    //CONVERT TO UPPERCASE
    plain = plain.toUpperCase()
    key = key.toUpperCase()
    
    if(key.length < plain.length){
        key += plain
    }
    //INITIALIZE CIPHER
    var cipher = ""
    //CIPHER GENERATING
    //FOR EACH CHARACTER IN PLAIN, SUBSTITUTE CIPHER WITH KEY IN THE SAME IDX WITH THAT CHAR
    for(var i=0; i<plain.length; i++){
        //GENERATING KEY
        //KEY IS AN IDX OF CHAR[i] IN ALPHABET 
        let k = key.charCodeAt(i)-65
        cipher+= alphabetSubsCipherEnc(plain[i], k)
    }
    return cipher
}

export const vigenereAutoKeyDec = (cipher, key) => {
    //I.S CIPHER AND KEY ARE DEFINE
    //F.S RETURN A STRING WHICH IS A DECRYPTED STRING BY VIGENERE STANDARD ALGORITHM
    //CIPHER IS AN ANY STRING
    //KEY IS AN ANY STRING
    //IF KEY IS SHORTEN THAN PLAIN, PLAIN WILL ADD INTO KEY

    //CONVERT TO UPPERCASE
    cipher = cipher.toUpperCase();
    key = key.toUpperCase();
    
    //INITIALIZE PLAIN
    var plain = ""
    for(var i=0; i<cipher.length; i++){
        //GENERATING KEY
        //KEY IS AN IDX OF CHAR[i] IN ALPHABET 
        var k;

        if(i < key.length){
            k = key.charCodeAt(i)-65 
        }else{ //ADDING PLAIN INTO KEY
            k = plain.charCodeAt(i-key.length)-65
        }
        plain+= alphabetSubsCipherDec(cipher[i], k)
    }

    return plain
}
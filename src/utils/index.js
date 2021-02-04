const menus = [
    'Vigenere Cipher Standard',
    'Full Vigenere Cipher',
    'Auto-key Vigenere Cipher',
    'Extended Vigenere Cipher',
    'Playfair Cipher',
    'Affine Cipher'
]

export const getMenu = () => {
    //I.S MENUS IS DEFINED
    //F.S RETURN MENUS
    return menus
}

export const removeNonAlphabetic = (input) => {
    //I.S INPUT IS STRING MAY CONTAIN NON ALPHABETIC CHAR
    //F.S RETURN A STRING THAT INPUT WITHOT NON ALPHABETIC CHAR

    //REPLACE NON ALPHABETIC CHAR WITH ''
    return input.replace(/[^a-z]/gi, '')
}

export const getOnlyPositive = (number) => {
    if(number > 0){
        return number
    }
    return '';
}

export const alphabetSubsCipherEnc = (plainChar, key)=> {
    //I.S PLAINCHAR AND KEY ARE DEFINE
    //F.S RETURN A CHAR AFTER SUBSTITUTE ENCRYPTION PROCCES
    //PLAINCHAR IS AN ANY ALPHABETIC CHAR
    //KEY IS AN ANY NUMBER
    //SWIPE PLAINCHAR RIGHT KEY TIMES

    //CONVERT CHAR TO ASCII
    //BECAUSE A IS 65 IN ASCII, WILL MINUS BY 65 (A = 0 IN ALPHABET)
    let plainIdx = (plainChar.toUpperCase().charCodeAt(0))-65

    //SWIPE PLAINIDX RIGHT KEY TIMES
    let cipherIdx = (plainIdx + key) % 26;

    //CONVERT ASCII TO CHAR
    //BECAUSE A IS 0 IN ALPHABET, WILL PLUS BY 65 (A = 65 IN ASCII)
    let cipherChar = String.fromCharCode(cipherIdx+65)

    return cipherChar
}

export const alphabetSubsCipherDec = (cipherChar, key)=> {
    //I.S CIPHERCHAR AND KEY ARE DEFINE
    //F.S RETURN A CHAR AFTER SUBSTITUTE DECRYPTION PROCCES
    //CIPHERCHAR IS AN ANY ALPHABETIC CHAR
    //KEY IS AN ANY NUMBER
    //SWIPE CIPHERCHAR LEFT KEY TIMES

    //CONVERT CHAR TO ASCII
    //BECAUSE A IS 65 IN ASCII, WILL MINUS BY 65 (A = 0 IN ALPHABET)
    let cipherIdx = (cipherChar.toUpperCase().charCodeAt(0))-65

    //SWIPE CIPHERCHAR LEFT KEY TIMES
    let plainIdx = (cipherIdx - key) % 26;
    if(plainIdx < 0){
        plainIdx = 26 - ((Math.abs(cipherIdx-key))%26)
    }

    //CONVERT ASCII TO CHAR
    //BECAUSE A IS 0 IN ALPHABET, WILL PLUS BY 65 (A = 65 IN ASCII)
    let plainChar = String.fromCharCode(plainIdx+65)

    return plainChar
}

export const asciiSubCipherEnc = (plainChar, key) => {
    //I.S PLAINCHAR AND KEY ARE DEFINE
    //F.S RETURN A CHAR AFTER SUBSTITUTE ENCRYPTION PROCCES
    //PLAINCHAR IS AN ANY ASCII CHAR
    //KEY IS AN ANY NUMBER
    //SWIPE PLAINCHAR RIGHT KEY TIMES

    //CONVERT CHAR TO ASCII CODE
    let plainIdx = plainChar.charCodeAt(0)

    //SWIPE PLAINIDX RIGHT KEY TIMES
    let cipherIdx = (plainIdx + key) % 256;

    //CONVERT ASCII CODE TO CHAR
    let cipherChar = String.fromCharCode(cipherIdx)

    return cipherChar
}

export const asciiSubCipherDec = (cipherChar, key) => {
    //I.S CIPHERCHAR AND KEY ARE DEFINE
    //F.S RETURN A CHAR AFTER SUBSTITUTE DECRYPTION PROCCES
    //CIPHERCHAR IS AN ANY ASCII CHAR
    //KEY IS AN ANY NUMBER
    //SWIPE CIPHERCHAR LEFT KEY TIMES

    //CONVERT CHAR TO ASCII CODE
    let cipherIdx = cipherChar.charCodeAt(0)

    //SWIPE CIPHERCHAR LEFT KEY TIMES
    let plainIdx = (cipherIdx - key) % 256;
    if(plainIdx < 0){
        plainIdx = 256 - ((Math.abs(cipherIdx-key))%256)
    }

    //CONVERT ASCII CODE TO CHAR
    let plainChar = String.fromCharCode(plainIdx)

    return plainChar
}
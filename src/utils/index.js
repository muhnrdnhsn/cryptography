const menus = [
    'Vigenere Cipher Standard',
    'Full Vigenere Cipher',
    'Auto-key Vigenere Cipher',
    'Extended Vigenere Cipher',
    'Playfair Cipher',
    'Affine Cipher',
    'RC4',
    'Modified RC4',
    'RSA'
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

export const asciiSubCipherEnc = (plain, key) => {
    //I.S PLAINCHAR AND KEY ARE DEFINE
    //F.S RETURN A CHAR AFTER SUBSTITUTE ENCRYPTION PROCCES
    //PLAINCHAR IS AN ANY ASCII CHAR
    //KEY IS AN ANY NUMBER
    //SWIPE PLAINCHAR RIGHT KEY TIMES

    //SWIPE PLAINIDX RIGHT KEY TIMES
    let cipher = (((plain + key) % 256) + 256) % 256;

    return cipher
}

export const asciiSubCipherDec = (cipher, key) => {
    //I.S CIPHERCHAR AND KEY ARE DEFINE
    //F.S RETURN A CHAR AFTER SUBSTITUTE DECRYPTION PROCCES
    //CIPHERCHAR IS AN ANY ASCII CHAR
    //KEY IS AN ANY NUMBER
    //SWIPE CIPHERCHAR LEFT KEY TIMES


    //SWIPE CIPHERCHAR LEFT KEY TIMES
    let plain = (((cipher - key) % 256) + 256) % 256;

    return plain
}

export const binary2dec = (binary) => {
    //I.S.  binary is a binary string
    //F.S.  a number that have a binary string like that
    var dec = parseInt(binary, 2);

    return(dec)
}

export const dec2binary = (dec, n_bits) => {
    //I.S.  dec is a positive number
    //F.S.  a n_bits binary string that represent that number

    var binary = (dec >>> 0).toString(2)

    if(n_bits){
        binary = "0".repeat(n_bits).substr(binary.length) + binary   
    }

    return(binary)
}
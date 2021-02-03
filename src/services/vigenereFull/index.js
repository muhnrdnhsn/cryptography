


const randomTables = [
    [26,1,25,20,24,3,23,4,22,5,21,6,2,7,18,8,14,9,17,10,16,11,15,12,19,13],
    [19,26,18,6,17,25,16,5,15,24,14,4,13,23,12,3,11,22,10,2,9,21,8,1,7,20],
    [23,25,26,24,22,20,19,16,14,12,10,8,6,4,2,1,3,5,7,9,11,13,17,15,18,21],
    [18,22,23,26,25,24,21,20,17,16,13,12,9,8,5,4,1,2,3,6,7,10,11,14,15,19],
    [20,21,24,25,26,23,22,19,18,14,15,11,10,6,1,7,2,3,4,5,8,9,12,13,16,17],
    [3,18,2,15,1,26,25,12,24,11,23,13,22,10,21,9,20,8,19,7,14,6,16,5,17,4],
    [6,5,4,3,2,1,26,24,25,23,22,21,20,14,19,17,16,15,18,11,13,12,10,9,8,7],
    [21,16,13,8,20,6,12,26,19,4,11,25,18,5,10,24,17,1,9,23,15,3,7,22,14,2],
    [1,24,21,17,4,19,6,8,26,25,3,10,5,22,7,12,9,14,11,16,23,18,13,2,20,15],
    [24,6,1,21,7,8,9,22,10,26,25,19,4,18,17,16,13,11,15,14,12,5,2,20,23,3],
    [2,10,6,1,19,21,24,25,11,17,26,22,15,9,4,14,12,16,13,18,5,7,20,23,3,8],
    [25,2,8,10,21,18,11,1,13,22,24,26,14,16,9,15,4,7,12,17,19,20,23,3,6,5],
    [9,8,11,14,10,22,1,21,6,18,12,24,26,17,16,19,15,4,2,13,20,23,3,7,5,25],
    [8,11,3,22,6,10,14,13,21,19,16,1,24,26,15,2,7,23,5,20,18,4,9,17,25,12],
    [11,13,22,19,8,16,10,18,2,21,1,5,7,24,26,20,6,12,23,15,3,17,4,25,9,14],
    [12,17,16,18,11,15,8,10,5,1,7,14,19,21,24,26,23,20,22,3,6,2,25,4,13,9],
    [22,7,9,2,3,11,17,15,8,10,5,16,21,1,14,13,26,18,20,24,4,25,19,6,12,23],
    [4,9,20,7,12,13,5,11,16,8,19,17,1,15,3,23,18,26,24,22,25,14,6,21,2,10],
    [7,4,19,9,14,2,20,6,12,13,17,15,11,3,23,22,21,24,26,25,10,16,5,8,1,18],
    [17,15,12,4,9,5,2,7,20,6,8,3,23,13,22,18,24,10,25,26,21,19,14,16,11,1],
    [14,19,17,13,15,4,3,9,7,20,6,23,8,2,11,5,22,25,1,12,26,24,18,10,21,16],
    [13,14,15,12,5,9,4,17,23,7,20,2,3,11,8,10,25,21,16,19,24,26,1,18,22,6],
    [10,12,7,5,16,14,18,23,3,9,2,20,17,19,13,25,8,6,21,1,22,15,26,24,4,11],
    [15,20,5,11,23,7,13,2,4,3,18,9,16,12,25,6,19,17,14,21,1,8,24,26,10,22],
    [16,3,10,23,13,17,7,14,9,15,4,18,12,25,20,21,5,19,6,8,2,1,22,11,26,24],
    [5,23,14,16,18,12,15,3,1,2,9,7,25,20,6,11,10,13,8,4,17,22,21,19,24,26]
]

export const vigenereFullEnc = (plain, key) => {
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
        let p = plain.charCodeAt(i)-65
        cipher += String.fromCharCode((randomTables[p][k])-1+65)
    }
    return cipher
}

export const vigenereFullDec = (cipher, key) => {
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
        let c = cipher.charCodeAt(i)-65

        //SEARCH FOR PLAIN CHAR BY
        //SEARCHING A CIPHER CHAR IN ROW K
        for(let col=0; col<26; col++){
            if(randomTables[col][k] === (c+1)){
                plain += String.fromCharCode(col+65)
            }
        }
    }

    return plain
}
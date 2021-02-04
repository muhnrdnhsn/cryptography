const generateSquareKeys = (key) => {
    //I.S KEY IS DEFINED
    //F.S MATRIX AFINE KEY

    //CONVERT KEY TO UPPERCASE
    key = key.toUpperCase()

    //REMOVE J
    key = key.replace("J", "")

    //GENERATE UNIQUE STRING FROM KEY
    let uniqueKey = ""
    for(var i=0; i<key.length; i++){
        if(!uniqueKey.includes(key[i])){
            uniqueKey += key[i]
        }
    }

    //APPEND A-Z IF NOT INCLUDE (EXC J)
    for(i=0; i<26; i++){
        if(!uniqueKey.includes(String.fromCharCode(65+i))){
            if(i !== 9){
                uniqueKey += String.fromCharCode(65+i)
            }
        }
    }

    //CONVERT UNIQUE KEY INTO MATRIKS
    var squareKeys = []
    uniqueKey.match(/.{5}/g).forEach(str => {
        squareKeys.push(str.split(""))
    })

    return squareKeys
}

const getIdxInSquare = (square, char) => {
    var row = 0;
    var col;
    var found = false;
    while((row < 5) && (!found)){
        col = 0;
        while((col < 5) && (!found)){
            if(square[row][col] === char){
                found = true;
            }else{
                col++;
            }
        }
        if(!found){
            row++;
        }
    }

    return({row, col});
}

export const playfairEnc = (plain, key) => {

    var squareKeys = generateSquareKeys(key)

    //CONVERT PLAIN AND KEY TO UPPERCASE
    plain = plain.toUpperCase()
    key = key.toUpperCase()

    //REPLACE J WITH I
    plain = plain.replace("J", "I")

    //INSERT X AT LAST IF PLAIN LENGTH IS ODD
    if(plain.length % 2 === 1){
        plain += "X"
    }

    //INSERT X BETWEEN 2 SAME LETTER CONSECUTIVELY
    for(var i=0; i<plain.length-1; i+=2){
        if(plain[i] === plain[i+1]){
            plain = [plain.slice(0,i+1), 'X', plain.slice(i+1)].join("")
        }
    }

    //INSERT X AT LAST IF PLAIN LENGTH IS ODD
    if(plain.length % 2 === 1){
        plain += "X"
    }

    //BIGRAM PLAIN
    var bigramPlain = plain.match(/.{2}/g)
    
    //ENCRYPT
    let cipher = ""
    bigramPlain.forEach(bigram => {
        let idxB1 = getIdxInSquare(squareKeys, bigram[0]);
        let idxB2 = getIdxInSquare(squareKeys, bigram[1]);

        //IN SAME ROW
        if(idxB1.row === idxB2.row){
            if(idxB1.col === 4){
                cipher += squareKeys[idxB1.row][0]
            }else{
                cipher += squareKeys[idxB1.row][idxB1.col+1]
            }
            if(idxB2.col === 4){
                cipher += squareKeys[idxB2.row][0]
            }else{
                cipher += squareKeys[idxB2.row][idxB2.col+1]
            }
        }
        //IN SAME COL
        else if(idxB1.col === idxB2.col){
            if(idxB1.row === 4){
                cipher += squareKeys[0][idxB1.col]
            }else{
                cipher += squareKeys[idxB1.row+1][idxB1.col]
            }
            if(idxB2.row === 4){
                cipher += squareKeys[0][idxB2.col]
            }else{
                cipher += squareKeys[idxB2.row+1][idxB2.col]
            }
        }
        //NOT IN SAME ROW OR COL
        else{
            cipher += squareKeys[idxB1.row][idxB2.col]
            cipher += squareKeys[idxB2.row][idxB1.col]
        }
    });

    return cipher;
}

export const playfairDec = (cipher, key) => {
    var squareKeys = generateSquareKeys(key);

    //CONVERT CIPHER AND KEY TO UPPERCASE
    cipher = cipher.toUpperCase()
    key = key.toUpperCase()

    //BIGRAM CIPHER
    var bigramCipher = cipher.match(/.{2}/g)

    //DECRYPT
    var plain = ""
    bigramCipher.forEach(bigram => {
        let idxB1 = getIdxInSquare(squareKeys, bigram[0]);
        let idxB2 = getIdxInSquare(squareKeys, bigram[1]);

        //IN SAME ROW
        if(idxB1.row === idxB2.row){
            if(idxB1.col === 0){
                plain += squareKeys[idxB1.row][4]
            }else{
                plain += squareKeys[idxB1.row][idxB1.col-1]
            }
            if(idxB2.col === 0){
                plain += squareKeys[idxB2.row][4]
            }else{
                plain += squareKeys[idxB2.row][idxB2.col-1]
            }
        }
        //IN SAME COL
        else if(idxB1.col === idxB2.col){
            if(idxB1.row === 0){
                plain += squareKeys[4][idxB1.col]
            }else{
                plain += squareKeys[idxB1.row-1][idxB1.col]
            }
            if(idxB2.row === 0){
                plain += squareKeys[4][idxB2.col]
            }else{
                plain += squareKeys[idxB2.row-1][idxB2.col]
            }
        }
        //NOT IN SAME ROW OR COL
        else{
            plain += squareKeys[idxB1.row][idxB2.col]
            plain += squareKeys[idxB2.row][idxB1.col]
        }
    });

    //REMOVE USELESS X
    if((plain.length % 2 === 0) && (plain[plain.length-1] === 'X')){
        plain = plain.slice(0, -1)
    }

    for(var i=0; i<plain.length; i++){
        if(plain[i] === 'X'){
            if((i>0) && (i+1<plain.length) && (plain[i-1] === plain[i+1])){
                plain = [plain.slice(0,i), plain.slice(i+1)].join("")
            }
        }
    }

    return plain
}
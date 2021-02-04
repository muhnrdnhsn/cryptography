export const affineEnc = (plain, m, b) => {
    //CONVERT PLAIN TEXT (TO UPPERCASE)
    plain = plain.toUpperCase()
    m = parseInt(m)
    b = parseInt(b)
    //ENC
    var cipher = ''
    plain.split("").forEach(char => {
        let plainCharIdx = (char.charCodeAt(0))-65
        let cipherCharIdx = ((m*plainCharIdx) + b)%26
        cipher += String.fromCharCode(cipherCharIdx+65)
    })

    return cipher
}

export const affineDec = (cipher, m, b) => {
    //SEARCH M^-1
    var i=0;
    m = parseInt(m)
    b = parseInt(b)
    while(((m*i)-1)%26 !== 0){
        i++
    }
    var plain = ''
    cipher = cipher.toUpperCase()
    

    cipher.split("").forEach(char => {  
        let cipherCharIdx = (char.charCodeAt(0))-65
        let plainCharIdx = (i * (cipherCharIdx-b))%26
        if(plainCharIdx < 0){
            plainCharIdx = 26 + plainCharIdx
        }
        plain += String.fromCharCode(plainCharIdx+65)
    })

    return plain;
}
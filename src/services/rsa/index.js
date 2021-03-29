// Impoert Big Integer
var bigInt = require("big-integer")
var bigIntConversion = require('bigint-conversion')

export const rsapubprikey = () => {

    // Generate random prime number p & q
    var p = genprime(16);
    var q = genprime(16);

    // Set variable n = p * q
    var n = p.times(q);

    // Set toitent euler (p - 1) * (q - 1)
    var toitenteuler = p.minus(1).times(q.minus(1));

    // Set variable e for encryption (public key)
    do {
        var e = bigInt.randBetween(bigInt(1), toitenteuler);
    } while(bigInt.gcd(e, toitenteuler).notEquals(1));

    // Set variable d for decryption (private key)
    var d = e.modInv(toitenteuler);

    // Return variable for public and private key
    return [n, e, d];
}

export const rsaencrypt = (input, plain, keyE, keyN) => {
    console.log(plain)
    let textCodes
    let m
    if(input === 'text'){
        textCodes = plain.split('').map((i) => {
            if(i.charCodeAt() < 10){
                return('00'+i.charCodeAt())
            }else if(i.charCodeAt() < 100){
                return('0'+i.charCodeAt())
            }else{
                return(i.charCodeAt())
            }
        })
        textCodes = textCodes.join('');
        m = textCodes.match(/.{6}/g);
    }else{
        textCodes = Array.from(new Uint8Array(plain)).map((i) => {
            if(i < 10){
                return('00'+i)
            }else if(i < 100){
                return('0'+i)
            }else{
                return(i)
            }
        })
        textCodes = textCodes.join('');
        m = textCodes.match(/.{3000}/g);
    }
    var e = bigInt(keyE);
    var n = bigInt(keyN);
    
    var c = m.map((i) => {
        return(bigIntConversion.bigintToHex((bigInt(i).modPow(e,n))))   
    }).join('\\x')

    return('\\x'+c);
}

export const rsadecrypt = (input, cipher, keyD, keyN) => {
    if(input === 'text'){
        var textCodes = cipher
        .split('\\x')
        .map((i) => {
            if(i !== ''){
                return(bigIntConversion.hexToBigint(i))
            }else{
                return("")
            }
        });
    }else{
        textCodes = Array.from(new Uint8Array(cipher)).map((i) => {
            if(i < 10){
                return('00'+i)
            }else if(i < 100){
                return('0'+i)
            }else{
                return(`${i}`)
            }
        }) 
    }
    console.log(textCodes)

    var d = bigInt(keyD);
    var n = bigInt(keyN);

    // var c = textCodes.match(/.{1,4}/g);
    var m = textCodes.map((i) => {
        if(i !== ''){
            var res = bigInt(i).modPow(d,n).toString()
            let prefix = res.length % 3
            for(var j=1; j<prefix; j++){
                res = `0${res}`
            }
            return res
        }else{
            return("")
        }
    }).join('')
    // let prefix = m.length %  3

    // for(var i=1; i<=prefix; i++)
    // {
    //     m = '0' + m
    // }
    // console.log(m);
    
    m = m.match(/.{3}/g).map((i)=>{
        return(String.fromCharCode(i))
    }).join('')
    return m
}

// Generate a k bit(s) random prime number with (k)th bit is 1
const genprime = (k) => {
    do {
        var prime = bigInt.randBetween(bigInt(Math.pow(2, (k-1))), bigInt(Math.pow(2, k)));
    } while(!prime.isPrime());

    return prime;
}
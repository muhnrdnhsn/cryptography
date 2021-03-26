// Impoert Big Integer
var bigInt = require("big-integer")

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

export const rsaencrypt = (plain, keyE, keyN) => {
    var textCodes = plain
        .split('')
        .map((i) => {
            if(i.charCodeAt() > 9){
                return i.charCodeAt()
            }else{
                return('0'+i.charCodeAt())
            }
        })
        .join('');

    var e = bigInt(keyE);
    var n = bigInt(keyN);

    var m = textCodes.match(/.{1,4}/g);
    var c = m.map((i) => {
        return(bigInt(i).mod(n).pow(e).mod(n))
    }).join('')

    return c;
}

export const rsadecrypt = (cipher, keyD, keyN) => {
    var textCodes = cipher
        .split('')
        .map((i) => {
            if(i.charCodeAt() > 9){
                return i.charCodeAt()
            }else{
                return('0'+i.charCodeAt())
            }
        })
        .join('');

    var d = bigInt(keyD);
    var n = bigInt(keyN);

    var c = textCodes.match(/.{1,4}/g);
    var m = c.map((i) => {
        return(bigInt(i).mod(n).pow(d).mod(n))
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
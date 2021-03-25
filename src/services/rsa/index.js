// Impoert Big Integer
var bigInt = require("big-integer")

export const rsapubprikey = () => {

    // Generate random prime number p & q
    var p = genprime(512);
    var q = genprime(512);

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

export const rsaencrypt = (text, key) => {
    var textCodes = text
        .split('')
        .map(i => i.charCodeAt())
        .join('');

    var keyCodes = key
        .split(',')

    var e = bigInt(keyCodes[0]);
    var n = bigInt(keyCodes[1]);

    return bigInt(textCodes).modPow(e, n);
}

export const rsadecrypt = (text, key) => {
    var keyCodes = key
        .split(',')

    var d = bigInt(keyCodes[0]);
    var n = bigInt(keyCodes[1]);

    var decrypted = bigInt(text).modPow(d, n);

    const stringified = decrypted.toString();
    let string = '';

    for (let i = 0; i < stringified.length; i += 2){
        let num = Number(stringified.substr(i, 2));

        if (num <= 30){
            string += String.fromCharCode(Number(stringified.substr(i, 3)));
            i++;
        }else{
            string += String.fromCharCode(num);
        }
    }

    return string;
}

// Generate a k bit(s) random prime number with (k)th bit is 1
const genprime = (k) => {
    do {
        var prime = bigInt.randBetween(bigInt(Math.pow(2, (k-1))), bigInt(Math.pow(2, k)));
    } while(!prime.isPrime());

    return prime;
}
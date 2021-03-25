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

export const encrypt = (text, e, n) => {

}

export const decrypt = (text, d, n) => {

}

// Generate a k bit(s) random prime number with (k)th bit is 1
const genprime = (k) => {
    do {
        var prime = bigInt.randBetween(bigInt(Math.pow(2, (k-1))), bigInt(Math.pow(2, k)));
    } while(!prime.isPrime());

    return prime;
}
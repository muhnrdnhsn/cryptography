export const basicVigenereEncrypt = (algorithm, plain, key) => {
    const cipher = plain + key + algorithm
    return cipher
}

export const basicVigenereDecrypt = (algorithm, cipher, key) => {
    const plain = cipher + key + algorithm
    return plain
}
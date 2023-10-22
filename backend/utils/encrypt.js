import bcrypt from 'bcrypt';

const saltRounds = 10;
const password = 'test_password';

export const hashPassword = async password => {
    return bcrypt
    .hash(password, saltRounds)
    .then(hash => {
        return hash;
    })
    .catch(err => {
        throw new Error(err);
    })
}

export const isPasswordCorrect = async (inputPassword, hashedPassword)  => {
    return bcrypt
    .compare(inputPassword, hashedPassword)
    .then(result => {
        return result;
    })
    .catch(err => {
        throw new Error(err);
    })
}

const hashedPassword = await hashPassword(password)
const passwordsMatch = await isPasswordCorrect('Test', hashedPassword);
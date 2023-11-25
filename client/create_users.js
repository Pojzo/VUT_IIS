function generateRandomUser() {
    const names = ["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown", 'Martin', 'gazdik', 'marek', 'ten clovek'];
    const genders = ["male", "female", "other"];
    const logins = ["johnD", "janeS", "aliceJ", "bobB"];
    const domains = ["example.com", "test.com", "dummy.com"];

    const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    return {
        id: Math.random().toString(36).substr(2, 9),  // generate random string id
        name: getRandomElement(names),
        birth_date: `${getRandomInt(1960, 2005)}-${String(getRandomInt(1, 12)).padStart(2, '0')}-${String(getRandomInt(1, 28)).padStart(2, '0')}`,
        gender: getRandomElement(genders),
        login: getRandomElement(logins) + getRandomInt(1, 99) + getRandomInt(1, 99),
        email: `${getRandomElement(logins)}@${getRandomElement(domains)}`,
        address: `${getRandomInt(1, 9999)} Elm Street, Springfield`,
        password: Math.random().toString(36).slice(-8)  // generate a random 8-character password
    };
}

const dummyUsers = Array(1000).fill(0).map(generateRandomUser);

console.log(dummyUsers);
// store them into a json file
const fs = require('fs');
fs.writeFileSync('dummy_users.json', JSON.stringify(dummyUsers));

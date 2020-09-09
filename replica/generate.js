const omit = require('lodash.omit');
const faker = require('faker');
const { getSaltAndHash, getUserToken } = require('./auth');

function userData(overrides = {}) { 
    const password = overrides.password || faker.internet.password()
    return Object.assign({ 
        username: faker.internet.userName(),
    },
    getSaltAndHash(password),
    omit(overrides, ['password'])
    )
}

function token(user) { 
    return getUserToken(userData(user))
}

module.exports = { 
    userData,
    token,
    password: faker.internet.password,
    username: faker.internet.userName,
    id: faker.random.uuid,
    fullname: faker.lorem.words(2),
    email: faker.internet.email
}
const request = require('supertest');
const mongoose = require('mongoose');
const server = require("../api/server");
const { User } = require("../rest-api/user/models/user-models");

const userOne = { 
    username: 'George',
    fullname: 'George Yaw',
    email: 'george@testmail.com',
    password: '678922244',
    position: 'guest'
}

beforeEach(async () => { 
    await User.deleteMany();
    await new User(userOne).save()
});

test('Should signup a new user', async () => { 
    await request(server).post(`$localhost:{process.env.PORT}/api/auth/register`).send({ 
        username: 'john',
        fullname: 'John Kofi',
        email: 'john@testmail.com',
        password: '12345678',
        position: 'guest'
    }).expect(201)
});

test('Should login existing user', async () => { 
    await request(server).post('/api/auth/login').send({ 
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})


test('Should not login non-existent user', async () => { 
    await request(server).post('/api/auth/login').send({
        email: userOne.email,
        password: 'notpassword'
    }).expect(400)
})
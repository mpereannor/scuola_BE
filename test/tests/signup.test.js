/* globals expect it */
const server = require('../../api/server')
const supertest = require('supertest')
const request = supertest(server)

const {User} = require('../../rest-api/user/models/user-models')
const { setupDB } = require('../../test-setup')

setupDB('testone', true)

it('Should save user to database', async done => {
  const res = await request.post('/signup')
    .send({
        username: "Vincy",
        fullname: "Zell Loop",
        email: "testing2@gmail.com",
        password: '14354343',
        position: 'guest'
    })

  // Ensures response contains name and email
  expect(res.body.name).toBeTruthy()
  expect(res.body.email).toBeTruthy()

  // Searches the user in the database
  const user = await User.findOne({ email: 'testing@gmail.com' })
  expect(user.name).toBeTruthy()
  expect(user.email).toBeTruthy()

  done()
})
/* globals expect it */
const server = require('../../api/server')
const supertest = require('supertest')
const request = supertest(server)

it('Testing to see if Jest works', () => {
  expect(1).toBe(1)
})

it('gets the test endpoint', async done => {
  const response = await request.get('/test')

  expect(response.status).toBe(200)
  expect(response.body.message).toBe('pass!')
  done()
})
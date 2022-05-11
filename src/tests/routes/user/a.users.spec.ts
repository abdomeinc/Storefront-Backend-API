import axios from 'axios'
import { baseUrl } from '../../../app'

// define, declare and assign urls that will be used for test purpose
const createUrl = `${baseUrl}/api/eshop/users/create`
const authenticateUrl = `${baseUrl}/api/eshop/users/authenticate`
const loadUrl = `${baseUrl}/api/eshop/users/5`
const editUrl = `${baseUrl}/api/eshop/users/5/edit`

let userAuthKey: string = 'Bearer '
describe('[Normal Users] Users API Endpoints', () => {
  describe(`Create Endpoint ${createUrl}`, () => {
    const createForm = {
      first_name: 'test',
      last_name: 'account 2',
      email: 'abc2@def.ghi',
      password: '123456'
    }
    it('returns status code 200', function (done) {
      axios({
        method: 'post',
        url: createUrl,
        data: createForm
      })
        .then(function (response) {
          console.log(
            `response status: ${response.status} ${response.statusText}`
          )
          console.log(response.data)
          expect(response.status).toBe(200)
          done()
        })
        .catch(function (error) {
          if (error.request) {
            console.log(error.request)
          } else {
            console.log('Error', error.message)
          }
        })
    })
  })

  describe(`Authenticate User Endpoint ${authenticateUrl}`, () => {
    const authenticateForm = {
      email: 'abc2@def.ghi',
      password: '123456'
    }
    it('returns status code 200', function (done) {
      axios({
        method: 'post',
        url: authenticateUrl,
        data: authenticateForm
      })
        .then(function (response) {
          console.log(
            `response status: ${response.status} ${response.statusText}`
          )
          userAuthKey += (<string>(response.data as unknown))
            .replace('"', '')
            .replace('"', '')
          console.log('userAuthKey: ' + userAuthKey)
          console.log(response.data)
          expect(response.status).toBe(200)
          done()
        })
        .catch(function (error) {
          if (error.request) {
            console.log(error.request)
          } else {
            console.log('Error', error.message)
          }
        })
    })
  })

  describe(`Load User Endpoint ${loadUrl}`, () => {
    it('returns status code 200', function (done) {
      axios({
        method: 'get',
        url: loadUrl,
        headers: {
          Authorization: userAuthKey
        }
      })
        .then(function (response) {
          console.log(
            `response status: ${response.status} ${response.statusText}`
          )
          console.log(response.data)
          expect(response.status).toBe(200)
          done()
        })
        .catch(function (error) {
          if (error.request) {
            console.log(error.request)
          } else {
            console.log('Error', error.message)
          }
        })
    })
  })

  describe(`Edit User Endpoint ${editUrl}`, () => {
    const editForm = {
      first_name: 'account',
      last_name: 'changed'
    }
    it('returns status code 200', function (done) {
      axios({
        method: 'put',
        url: editUrl,
        data: editForm,
        headers: {
          Authorization: userAuthKey
        }
      })
        .then(function (response) {
          console.log(
            `response status: ${response.status} ${response.statusText}`
          )
          console.log(response.data)
          expect(response.status).toBe(200)
          done()
        })
        .catch(function (error) {
          if (error.request) {
            console.log(error.request)
          } else {
            console.log('Error', error.message)
          }
        })
    })
  })
})

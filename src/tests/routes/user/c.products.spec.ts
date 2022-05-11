import axios from 'axios'
import { baseUrl } from '../../../app'

// define, declare and assign urls that will be used for test purpose
const loadAllUrl = `${baseUrl}/api/eshop/categories/1/products`
const loadUrl = `${baseUrl}/api/eshop/categories/1/products/1`

describe('[Normal Users] Products API Endpoints', () => {
  describe(`Load All Products for category 1 Endpoint ${loadAllUrl}`, () => {
    it('returns status code 200', function (done) {
      axios({
        method: 'get',
        url: loadAllUrl
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

  describe(`Load Product 1 Endpoint ${loadUrl}`, () => {
    it('returns status code 200', function (done) {
      axios({
        method: 'get',
        url: loadUrl
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

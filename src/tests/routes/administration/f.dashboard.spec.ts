import axios from 'axios'
import { baseUrl } from '../../../app'

// define, declare and assign urls that will be used for test purpose
const productsInOrdersUrl = `${baseUrl}/api/administration/eshop/dashboard/orders/products`
const usersWithOrdersUrl = `${baseUrl}/api/administration/eshop/dashboard/orders/users`
const fiveMostExpensiveUrl = `${baseUrl}/api/administration/eshop/dashboard/products/top5`

describe('Dashboard API Endpoints', () => {
  describe(`Load Products In Orders Endpoint ${productsInOrdersUrl}`, () => {
    it('returns status code 200', function (done) {
      axios({
        method: 'get',
        url: productsInOrdersUrl
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

  describe(`Load Users With Orders Endpoint ${usersWithOrdersUrl}`, () => {
    it('returns status code 200', function (done) {
      axios({
        method: 'get',
        url: usersWithOrdersUrl
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

  describe(`Load Five Most Expensive Endpoint ${fiveMostExpensiveUrl}`, () => {
    it('returns status code 200', function (done) {
      axios({
        method: 'get',
        url: fiveMostExpensiveUrl
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

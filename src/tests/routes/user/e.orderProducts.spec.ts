import apiListen, { baseUrl } from '../../../app'
import axios from 'axios'

// define, declare and assign urls that will be used for test purpose
const LoadAllUrl = `${baseUrl}/api/eshop/users/1/orders/2/products`
const loadUrl = `${baseUrl}/api/eshop/users/1/orders/2/products/3`
const createUrl = `${baseUrl}/api/eshop/users/1/orders/2/products/create`
const editUrl = `${baseUrl}/api/eshop/users/1/orders/2/products/6/edit`
const deleteUrl = `${baseUrl}/api/eshop/users/1/orders/2/products/6/delete`

const userAuthKey: string =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdF9uYW1lIjoiQWJkZWwgTW91bWVuIiwibGFzdF9uYW1lIjoiQWJkZWwgUmFvdWYiLCJmdWxsX25hbWUiOiJBYmRlbCBNb3VtZW4gQWJkZWwgUmFvdWYiLCJlbWFpbCI6ImFsaWFsbWFzcnlAZWd5ZndkLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJGJ5eUdDT1p4UktvTHp1ZVNHYjFYUU9JdlFQc2VQM0RCSGkzbXFQVGo3Tm1FNHRwVjdmVmpTIiwiaXNfYWRtaW4iOmZhbHNlLCJvcmRlcnNfY291bnQiOiIwIiwiY3JlYXRlX2RhdGUiOiIyMDIyLTAzLTA1VDIyOjAwOjAwLjAwMFoiLCJsYXN0X2xvZ2luX2RhdGUiOm51bGx9LCJpYXQiOjE2NDY1NTUwNTV9.U6tYEbAIoQ267nuOAsOotO3emAn5qFVgVQ-9rAMu-GM'

describe('[Normal Users] Orders API Endpoints', () => {
  afterAll(() => {
    apiListen.close()
  })
  describe(`Load All Order prodcuts for user Endpoint ${LoadAllUrl}`, () => {
    it('returns status code 200', function (done) {
      axios({
        method: 'get',
        url: LoadAllUrl,
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

  describe(`Load Order specific product Endpoint ${loadUrl}`, () => {
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

  describe(`Create a new order product Endpoint ${createUrl}`, () => {
    const createForm = {
      product_id: 2,
      quantity: 5
    }
    it('returns status code 200', function (done) {
      axios({
        method: 'post',
        url: createUrl,
        data: createForm,
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

  describe(`Update order product 5 Endpoint ${editUrl}`, () => {
    const editForm = {
      product_id: 1,
      quantity: 7
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

  describe(`Delete Order product Endpoint ${deleteUrl}`, () => {
    it('returns status code 200', function (done) {
      axios({
        method: 'delete',
        url: deleteUrl,
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

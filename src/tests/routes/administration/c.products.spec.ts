import axios from 'axios'
import { baseUrl } from '../../../app'

// define, declare and assign urls that will be used for test purpose
const loadAllUrl = `${baseUrl}/api/administration/eshop/categories/1/products`
const loadUrl = `${baseUrl}/api/administration/eshop/categories/1/products/1`
const editUrl = `${baseUrl}/api/administration/eshop/categories/1/products/6/edit`
const createUrl = `${baseUrl}/api/administration/eshop/categories/1/products/create`
const deleteUrl = `${baseUrl}/api/administration/eshop/categories/1/products/6/delete`

const adminAuthKey: string =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJmaXJzdF9uYW1lIjoiU3lzdGVtIiwibGFzdF9uYW1lIjoiQWRtaW4iLCJmdWxsX25hbWUiOiJTeXN0ZW0gQWRtaW4iLCJlbWFpbCI6InN5c3RlbV9hZG1pbkBlZ3lmd2QuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkT2RUUlhnQW9jYXRNd3B5QTJpRUUzLjBqSWplWi83UWU1NHlVejBnVTc2b0pWeTlMYmthRnkiLCJpc19hZG1pbiI6dHJ1ZSwib3JkZXJzX2NvdW50IjoiMCIsImNyZWF0ZV9kYXRlIjoiMjAyMi0wMy0wNVQyMjowMDowMC4wMDBaIiwibGFzdF9sb2dpbl9kYXRlIjpudWxsfSwiaWF0IjoxNjQ2NTU1MDU1fQ.mMI-aSADn-XZrAwoQyXflWAabmBbW-vxaXkBHQ5JZWU'

describe('[Admin Users] Products API Endpoints', () => {
  describe(`Load All Products Endpoint ${loadAllUrl}`, () => {
    it('returns status code 200', function (done) {
      axios({
        method: 'get',
        url: loadAllUrl,
        headers: {
          Authorization: adminAuthKey
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

  describe(`Load Products Endpoint ${loadUrl}`, () => {
    it('returns status code 200', function (done) {
      axios({
        method: 'get',
        url: loadUrl,
        headers: {
          Authorization: adminAuthKey
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

  describe(`Create Product Endpoint ${createUrl}`, () => {
    const createForm = {
      name: 'super product',
      price: 7000
    }
    it('returns status code 200', function (done) {
      axios({
        method: 'post',
        url: createUrl,
        data: createForm,
        headers: {
          Authorization: adminAuthKey
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

  describe(`Edit Product Endpoint ${editUrl}`, () => {
    const editForm = { name: 'the super product', price: 8000 }
    it('returns status code 200', function (done) {
      axios({
        method: 'put',
        url: editUrl,
        data: editForm,
        headers: {
          Authorization: adminAuthKey
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

  describe(`Delete Product Endpoint ${deleteUrl}`, () => {
    it('returns status code 200', function (done) {
      axios({
        method: 'delete',
        url: deleteUrl,
        headers: {
          Authorization: adminAuthKey
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

import apiListen, { baseUrl } from '../../../app'
import axios from 'axios'

// define, declare and assign urls that will be used for test purpose
const loadAllUrl = `${baseUrl}/api/administration/management/users`
const loadAllAdminsUrl = `${baseUrl}/api/administration/management/users/admins`
const loadAllNonAdminsUrl = `${baseUrl}/api/administration/management/users/non-admins`
const createUrl = `${baseUrl}/api/administration/management/users/create`
const deleteUrl = `${baseUrl}/api/administration/management/users/4/delete`

const adminAuthKey: string =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJmaXJzdF9uYW1lIjoiU3lzdGVtIiwibGFzdF9uYW1lIjoiQWRtaW4iLCJmdWxsX25hbWUiOiJTeXN0ZW0gQWRtaW4iLCJlbWFpbCI6InN5c3RlbV9hZG1pbkBlZ3lmd2QuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkT2RUUlhnQW9jYXRNd3B5QTJpRUUzLjBqSWplWi83UWU1NHlVejBnVTc2b0pWeTlMYmthRnkiLCJpc19hZG1pbiI6dHJ1ZSwib3JkZXJzX2NvdW50IjoiMCIsImNyZWF0ZV9kYXRlIjoiMjAyMi0wMy0wNVQyMjowMDowMC4wMDBaIiwibGFzdF9sb2dpbl9kYXRlIjpudWxsfSwiaWF0IjoxNjQ2NTU1MDU1fQ.mMI-aSADn-XZrAwoQyXflWAabmBbW-vxaXkBHQ5JZWU'

describe('[Admin Users] Users API Endpoints', () => {
  beforeAll(() => {
    // eslint-disable-next-line no-unused-expressions
    apiListen
  })

  describe(`Load All Users Endpoint ${loadAllUrl}`, () => {
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

  describe(`Load Admin Users Endpoint ${loadAllAdminsUrl}`, () => {
    it('returns status code 200', function (done) {
      axios({
        method: 'get',
        url: loadAllAdminsUrl,
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

  describe(`Load Non Admins Users Endpoint ${loadAllNonAdminsUrl}`, () => {
    it('returns status code 200', function (done) {
      axios({
        method: 'get',
        url: loadAllNonAdminsUrl,
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

  describe(`Create Admin User Endpoint ${createUrl}`, () => {
    const createForm = {
      first_name: 'test',
      last_name: 'account',
      email: 'abc@def.ghi',
      password: '123456'
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

  describe(`Delete Admin User Endpoint ${deleteUrl}`, () => {
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

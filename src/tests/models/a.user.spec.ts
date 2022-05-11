import { User, UserHandler } from '../../models/User'
import dotenv from 'dotenv'
import { SystemLogger } from '../../utilities/systemLogger'
import jwt from 'jsonwebtoken'

dotenv.config()
const handler = new UserHandler()

describe('User Model', () => {
  // beforeAll(() => {
  //   process.env.ENV = 'test'
  // })
  // afterAll(() => {
  //   process.env.ENV = 'dev'
  // })
  describe('loadAll method', () => {
    it('UserHandler should have an loadAll method', async () => {
      expect(await handler.loadAll).toBeDefined()
    })

    it('loadAll method should return array of users 0 length', async () => {
      await handler
        .loadAll()
        .then((result) => {
          expect(result.length).toEqual(0)
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })
  })

  describe('Create method', () => {
    it('UserHandler should have an create method', () => {
      expect(handler.create).toBeDefined()
    })

    it('create method should add a new normal user [Ali Al-Masry] and returns its data', async () => {
      const user: User = new User()
      user.first_name = 'Ali'
      user.last_name = 'Al-Masry'
      user.email = 'alialmasry@egyfwd.com'
      user.password = 'egyfwd'
      user.is_admin = false

      await handler
        .create(user)
        .then((result) => {
          expect(result.id).toEqual(1)
          expect(result.first_name).toEqual('Ali')
          expect(result.last_name).toEqual('Al-Masry')
          expect(result.email).toEqual('alialmasry@egyfwd.com')
          expect(result.password).toContain('$2b$10$')
          expect(result.is_admin).toEqual(false)
          expect(result.email).not.toEqual('alialmasry@gmail.com')
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })

    it('create method should add a new admin user [System Admin] and returns its data', async () => {
      const user: User = new User()
      user.first_name = 'System'
      user.last_name = 'Admin'
      user.email = 'system_admin@egyfwd.com'
      user.password = 'egyfwd'
      user.is_admin = true

      await handler
        .create(user)
        .then((result) => {
          expect(result.id).toEqual(2)
          expect(result.first_name).toEqual('System')
          expect(result.last_name).toEqual('Admin')
          expect(result.email).toEqual('system_admin@egyfwd.com')
          expect(result.password).toContain('$2b$10$')
          expect(result.is_admin).toEqual(true)
          expect(result.email).not.toEqual('system_admin@gmail.com')
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })

    it('create method should add a new normal user [test user] and returns its data', async () => {
      const user: User = new User()
      user.first_name = 'test'
      user.last_name = 'user'
      user.email = 'test_user@egyfwd.com'
      user.password = 'test'
      user.is_admin = false

      await handler
        .create(user)
        .then((result) => {
          expect(result.id).toEqual(3)
          expect(result.first_name).toEqual('test')
          expect(result.last_name).toEqual('user')
          expect(result.email).toEqual('test_user@egyfwd.com')
          expect(result.password).toContain('$2b$10$')
          expect(result.is_admin).toEqual(false)
          expect(result.email).not.toEqual('test_user@gmail.com')
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })
  })

  describe('loadAll method', () => {
    it('loadAll method should return array of users 3 length', async () => {
      await handler
        .loadAll()
        .then((result) => {
          expect(result.length).toEqual(3)
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })
  })

  describe('Load method', () => {
    it('UserHandler should have an load method', () => {
      expect(handler.load).toBeDefined()
    })

    it('load method should load user with id 1 and returns its data', async () => {
      await handler
        .load(1)
        .then((result) => {
          console.log(result)
          expect(result.id).toEqual(1)
          expect(result.first_name).toEqual('Ali')
          expect(result.last_name).toEqual('Al-Masry')
          expect(result.full_name).toEqual('Ali Al-Masry')
          expect(result.email).toEqual('alialmasry@egyfwd.com')
          expect(result.is_admin).toEqual(false)
          expect(result.email).not.toEqual('alialmasry@gmail.com')
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })

    it('load method should load user with id 2 and returns its data', async () => {
      await handler
        .load(2)
        .then((result) => {
          console.log(result)
          expect(result.id).toEqual(2)
          expect(result.first_name).toEqual('System')
          expect(result.last_name).toEqual('Admin')
          expect(result.full_name).toEqual('System Admin')
          expect(result.email).toEqual('system_admin@egyfwd.com')
          expect(result.is_admin).toEqual(true)
          expect(result.email).not.toEqual('system_admin@gmail.com')
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })

    it('load method should load user with id 3 and returns its data', async () => {
      await handler
        .load(3)
        .then((result) => {
          console.log(result)
          expect(result.id).toEqual(3)
          expect(result.first_name).toEqual('test')
          expect(result.last_name).toEqual('user')
          expect(result.full_name).toEqual('test user')
          expect(result.email).toEqual('test_user@egyfwd.com')
          expect(result.is_admin).toEqual(false)
          expect(result.email).not.toEqual('test_user@gmail.com')
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })
  })

  describe('Edit method', () => {
    it('UserHandler should have an edit method', () => {
      expect(handler.edit).toBeDefined()
    })

    it('edit method should edit user 1 and returns its data', async () => {
      await handler.edit(1, 'Abdel Moumen', 'Abdel Raouf').then((result) => {
        expect(result.first_name).toEqual('Abdel Moumen')
        expect(result.last_name).toEqual('Abdel Raouf')
      })
    })
  })

  describe('Authenticate method', () => {
    it('UserHandler should have an authenticate method', () => {
      expect(handler.authenticate).toBeDefined()
    })

    it('authenticate method should authenticate alialmasry@egyfwd.com user and returns user data', async () => {
      await handler
        .authenticate('alialmasry@egyfwd.com', 'egyfwd')
        .then((result) => {
          expect(result.id).toEqual(1)
          try {
            const token = jwt.sign(
              { user: result },
              process.env.TOKEN_SECRET as string
            )
            // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdF9uYW1lIjoiQWJkZWwgTW91bWVuIiwibGFzdF9uYW1lIjoiQWJkZWwgUmFvdWYiLCJmdWxsX25hbWUiOiJBYmRlbCBNb3VtZW4gQWJkZWwgUmFvdWYiLCJlbWFpbCI6ImFsaWFsbWFzcnlAZWd5ZndkLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJGJ5eUdDT1p4UktvTHp1ZVNHYjFYUU9JdlFQc2VQM0RCSGkzbXFQVGo3Tm1FNHRwVjdmVmpTIiwiaXNfYWRtaW4iOmZhbHNlLCJvcmRlcnNfY291bnQiOiIwIiwiY3JlYXRlX2RhdGUiOiIyMDIyLTAzLTA1VDIyOjAwOjAwLjAwMFoiLCJsYXN0X2xvZ2luX2RhdGUiOm51bGx9LCJpYXQiOjE2NDY1NTUwNTV9.U6tYEbAIoQ267nuOAsOotO3emAn5qFVgVQ-9rAMu-GM
            expect(token).toContain('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
            console.log(token)
          } catch (err) {
            SystemLogger.log(err as string)
          }
        })
    })

    it('authenticate method should authenticate system_admin@egyfwd.com user and returns user data', async () => {
      await handler
        .authenticate('system_admin@egyfwd.com', 'egyfwd')
        .then((result) => {
          expect(result.id).toEqual(2)
          try {
            const token = jwt.sign(
              { user: result },
              process.env.TOKEN_SECRET as string
            )
            // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJmaXJzdF9uYW1lIjoiU3lzdGVtIiwibGFzdF9uYW1lIjoiQWRtaW4iLCJmdWxsX25hbWUiOiJTeXN0ZW0gQWRtaW4iLCJlbWFpbCI6InN5c3RlbV9hZG1pbkBlZ3lmd2QuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkT2RUUlhnQW9jYXRNd3B5QTJpRUUzLjBqSWplWi83UWU1NHlVejBnVTc2b0pWeTlMYmthRnkiLCJpc19hZG1pbiI6dHJ1ZSwib3JkZXJzX2NvdW50IjoiMCIsImNyZWF0ZV9kYXRlIjoiMjAyMi0wMy0wNVQyMjowMDowMC4wMDBaIiwibGFzdF9sb2dpbl9kYXRlIjpudWxsfSwiaWF0IjoxNjQ2NTU1MDU1fQ.mMI-aSADn-XZrAwoQyXflWAabmBbW-vxaXkBHQ5JZWU
            expect(token).toContain('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
            console.log(token)
          } catch (err) {
            SystemLogger.log(err as string)
          }
        })
    })
  })

  describe('Delete method', () => {
    it('UserHandler should have an delete method', () => {
      expect(handler.delete).toBeDefined()
    })

    it('delete method should delete user 3 and returns with success for deletion.', async () => {
      await handler.delete(3).then((result) => {
        expect(result).toBeTrue()
      })
    })
  })
})

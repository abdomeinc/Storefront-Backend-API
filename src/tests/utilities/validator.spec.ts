import { Validator } from '../../utilities/validator'

describe('Validator Methods', () => {
  describe('isDigits method', () => {
    it('Validator should have an isDigits method', async () => {
      expect(Validator.isDigits).toBeDefined()
    })

    it('isDigits method should return true', async () => {
      expect(Validator.isDigits('123456')).toEqual(true)
    })

    it('isDigits method should return false', async () => {
      expect(Validator.isDigits('a1b2c3')).toEqual(false)
    })
  })

  describe('isEmail method', () => {
    it('Validator should have an isEmail method', async () => {
      expect(Validator.isEmail).toBeDefined()
    })

    it('isEmail method should return true', async () => {
      expect(Validator.isEmail('abc@mail.com')).toEqual(true)
    })

    it('isEmail method should return false', async () => {
      expect(Validator.isEmail('abcmail.com')).toEqual(false)
    })
  })
})

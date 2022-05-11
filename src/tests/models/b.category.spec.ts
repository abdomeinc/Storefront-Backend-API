import { CategoryHandler } from '../../models/Category'
import dotenv from 'dotenv'
import { SystemLogger } from '../../utilities/systemLogger'

dotenv.config()
const handler = new CategoryHandler()

describe('Category Model', () => {
  // beforeAll(() => {
  //   process.env.ENV = 'test'
  // })
  // afterAll(() => {
  //   process.env.ENV = 'dev'
  // })
  describe('loadAll method', () => {
    it('CategoryHandler should have an loadAll method', async () => {
      expect(await handler.loadAll).toBeDefined()
    })

    it('loadAll method should return array of categories 0 length', async () => {
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
    it('CategoryHandler should have an create method', () => {
      expect(handler.create).toBeDefined()
    })

    it('create method should add a new category [Smart Phones] and returns its data', async () => {
      await handler
        .create('Smart Phones')
        .then((result) => {
          expect(result.id).toEqual(1)
          expect(result.name).toEqual('Smart Phones')
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })

    it('create method should add a new category [Computers] and returns its data', async () => {
      await handler
        .create('Computers')
        .then((result) => {
          expect(result.id).toEqual(2)
          expect(result.name).toEqual('Computers')
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })

    it('create method should add a new category [test category] and returns its data', async () => {
      await handler
        .create('test category')
        .then((result) => {
          expect(result.id).toEqual(3)
          expect(result.name).toEqual('test category')
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })
  })

  describe('loadAll method', () => {
    it('loadAll method should return array of categories 3 length', async () => {
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
    it('CategoryHandler should have an load method', () => {
      expect(handler.load).toBeDefined()
    })

    it('load method should load category with id 1 and returns its data', async () => {
      await handler
        .load(1)
        .then((result) => {
          console.log(result)
          expect(result.id).toEqual(1)
          expect(result.name).toEqual('Smart Phones')
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })

    it('load method should load category with id 2 and returns its data', async () => {
      await handler
        .load(2)
        .then((result) => {
          console.log(result)
          expect(result.id).toEqual(2)
          expect(result.name).toEqual('Computers')
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })

    it('load method should load category with id 3 and returns its data', async () => {
      await handler
        .load(3)
        .then((result) => {
          console.log(result)
          expect(result.id).toEqual(3)
          expect(result.name).toEqual('test category')
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })
  })

  describe('Edit method', () => {
    it('CategoryHandler should have an edit method', () => {
      expect(handler.edit).toBeDefined()
    })

    it('edit method should edit category 1 and returns its data', async () => {
      await handler.edit(1, 'Smart Phones Category').then((result) => {
        expect(result.id).toEqual(1)
        expect(result.name).toEqual('Smart Phones Category')
      })
    })

    it('edit method should edit category 2 and returns its data', async () => {
      await handler.edit(2, 'Computers Category').then((result) => {
        expect(result.id).toEqual(2)
        expect(result.name).toEqual('Computers Category')
      })
    })
  })

  describe('Delete method', () => {
    it('CategoryHandler should have an delete method', () => {
      expect(handler.delete).toBeDefined()
    })

    it('delete method should delete category 3 and returns with success for deletion.', async () => {
      await handler.delete(3).then((result) => {
        expect(result).toBeTrue()
      })
    })
  })
})

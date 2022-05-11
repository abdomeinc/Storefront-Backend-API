import { Product, ProductHandler } from '../../models/Product'
import dotenv from 'dotenv'
import { SystemLogger } from '../../utilities/systemLogger'

dotenv.config()
const handler = new ProductHandler()

describe('Product Model', () => {
  // beforeAll(() => {
  //   process.env.ENV = 'test'
  // })
  // afterAll(() => {
  //   process.env.ENV = 'dev'
  // })
  describe('loadAll method', () => {
    it('ProductHandler should have an loadAll method', async () => {
      expect(await handler.loadAll).toBeDefined()
    })

    it('loadAll method should return array of products of category 1 with length 0', async () => {
      await handler
        .loadAll(1)
        .then((result) => {
          expect(result.length).toEqual(0)
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })
  })

  describe('Create method', () => {
    it('ProductHandler should have an create method', () => {
      expect(handler.create).toBeDefined()
    })

    it('create method should add a new normal product [Samsung A70s] and returns its data', async () => {
      const product: Product = new Product(-1)
      product.category_id = 1
      product.name = 'Samsung A70s'
      product.price = 5700

      await handler
        .create(product)
        .then((result) => {
          expect(result.id).toEqual(1)
          expect(result.name).toEqual('Samsung A70s')
          expect(result.price).toEqual(5700)
          expect(result.category_id).toEqual(1)
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })

    it('create method should add a new admin product [Oppo A30s] and returns its data', async () => {
      const product: Product = new Product(-1)
      product.category_id = 1
      product.name = 'Oppo A30s'
      product.price = 4500

      await handler
        .create(product)
        .then((result) => {
          expect(result.id).toEqual(2)
          expect(result.name).toEqual('Oppo A30s')
          expect(result.price).toEqual(4500)
          expect(result.category_id).toEqual(1)
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })

    it('create method should add a new admin product [DELL Inspiron 5500 Laptop] and returns its data', async () => {
      const product: Product = new Product(-1)
      product.category_id = 2
      product.name = 'DELL Inspiron 5500 Laptop'
      product.price = 9800

      await handler
        .create(product)
        .then((result) => {
          expect(result.id).toEqual(3)
          expect(result.name).toEqual('DELL Inspiron 5500 Laptop')
          expect(result.price).toEqual(9800)
          expect(result.category_id).toEqual(2)
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })

    it('create method should add a new admin product [HP Crown Desktop] and returns its data', async () => {
      const product: Product = new Product(-1)
      product.category_id = 2
      product.name = 'HP Crown Desktop'
      product.price = 6300

      await handler
        .create(product)
        .then((result) => {
          expect(result.id).toEqual(4)
          expect(result.name).toEqual('HP Crown Desktop')
          expect(result.price).toEqual(6300)
          expect(result.category_id).toEqual(2)
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })

    it('create method should add a new admin product [test product] and returns its data', async () => {
      const product: Product = new Product(-1)
      product.category_id = 2
      product.name = 'test product'
      product.price = 500

      await handler
        .create(product)
        .then((result) => {
          expect(result.id).toEqual(5)
          expect(result.name).toEqual('test product')
          expect(result.price).toEqual(500)
          expect(result.category_id).toEqual(2)
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })
  })

  describe('loadAll method', () => {
    it('loadAll method should return array of products for category 1 with length 2', async () => {
      await handler
        .loadAll(1)
        .then((result) => {
          expect(result.length).toEqual(2)
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })
  })

  describe('loadAll method', () => {
    it('loadAll method should return array of products for category 2 with length 3', async () => {
      await handler
        .loadAll(2)
        .then((result) => {
          expect(result.length).toEqual(3)
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })
  })

  describe('loadAll method', () => {
    it('loadAll method should return array of products for category 3 with length 0', async () => {
      await handler
        .loadAll(3)
        .then((result) => {
          expect(result.length).toEqual(0)
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })
  })

  describe('Load method', () => {
    it('ProductHandler should have an load method', () => {
      expect(handler.load).toBeDefined()
    })

    it('load method should product with id 1 and returns its data', async () => {
      await handler
        .load(1, 1)
        .then((result) => {
          console.log(result)
          expect(result.category_id).toEqual(1)
          expect(result.id).toEqual(1)
          expect(result.name).toEqual('Samsung A70s')
          expect(result.price).toEqual(5700)
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })

    it('load method should product with id 2 and returns its data', async () => {
      await handler
        .load(1, 2)
        .then((result) => {
          console.log(result)
          expect(result.category_id).toEqual(1)
          expect(result.id).toEqual(2)
          expect(result.name).toEqual('Oppo A30s')
          expect(result.price).toEqual(4500)
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })

    it('load method should product with id 3 and returns its data', async () => {
      await handler
        .load(2, 3)
        .then((result) => {
          console.log(result)
          expect(result.category_id).toEqual(2)
          expect(result.id).toEqual(3)
          expect(result.name).toEqual('DELL Inspiron 5500 Laptop')
          expect(result.price).toEqual(9800)
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })

    it('load method should product with id 4 and returns its data', async () => {
      await handler
        .load(2, 4)
        .then((result) => {
          console.log(result)
          expect(result.category_id).toEqual(2)
          expect(result.id).toEqual(4)
          expect(result.name).toEqual('HP Crown Desktop')
          expect(result.price).toEqual(6300)
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })

    it('load method should product with id 5 and returns its data', async () => {
      await handler
        .load(2, 5)
        .then((result) => {
          console.log(result)
          expect(result.category_id).toEqual(2)
          expect(result.id).toEqual(5)
          expect(result.name).toEqual('test product')
          expect(result.price).toEqual(500)
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })
  })

  describe('Edit method', () => {
    it('ProductHandler should have an edit method', () => {
      expect(handler.edit).toBeDefined()
    })

    const product1: Product = new Product(1)
    product1.category_id = 1
    product1.name = 'Samsung Galaxy Dual Sim'
    product1.price = 4500
    it('edit method should edit product 1 and returns its data', async () => {
      await handler.edit(product1).then((result) => {
        expect(result.name).toEqual('Samsung Galaxy Dual Sim')
        expect(result.price).toEqual(4500)
      })
    })

    const product2: Product = new Product(2)
    product2.category_id = 1
    product2.name = 'Oppo A74'
    product2.price = 4999
    it('edit method should edit product 2 and returns its data', async () => {
      await handler.edit(product2).then((result) => {
        expect(result.name).toEqual('Oppo A74')
        expect(result.price).toEqual(4999)
      })
    })

    const product3: Product = new Product(3)
    product3.category_id = 2
    product3.name = 'Laptop DELL Inspiron 5800'
    product3.price = 8750
    it('edit method should edit product 3 and returns its data', async () => {
      await handler.edit(product3).then((result) => {
        expect(result.name).toEqual('Laptop DELL Inspiron 5800')
        expect(result.price).toEqual(8750)
      })
    })

    const product4: Product = new Product(4)
    product4.category_id = 2
    product4.name = 'HP Crown PC'
    product4.price = 6700
    it('edit method should edit product 4 and returns its data', async () => {
      await handler.edit(product4).then((result) => {
        expect(result.name).toEqual('HP Crown PC')
        expect(result.price).toEqual(6700)
      })
    })
  })

  describe('Delete method', () => {
    it('ProductHandler should have an delete method', () => {
      expect(handler.delete).toBeDefined()
    })

    it('delete method should delete this product 5 in category 2 and returns with success for deletion.', async () => {
      await handler.delete(2, 5).then((result) => {
        expect(result).toBeTrue()
      })
    })
  })
})

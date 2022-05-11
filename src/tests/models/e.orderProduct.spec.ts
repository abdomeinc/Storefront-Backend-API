import { OrderProduct, OrderProductsHandler } from '../../models/OrderProduct'
import dotenv from 'dotenv'
import { SystemLogger } from '../../utilities/systemLogger'

dotenv.config()
const handler = new OrderProductsHandler()

describe('OrderProduct Model', () => {
  // beforeAll(() => {
  //   process.env.ENV = 'test'
  // })
  // afterAll(() => {
  //   process.env.ENV = 'dev'
  // })
  describe('loadAll method', () => {
    it('OrderProductsHandler should have an loadAll method', async () => {
      expect(await handler.loadAll).toBeDefined()
    })

    it('loadAll method should return array of orders with length 0', async () => {
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
    it('OrderProductsHandler should have an create method', () => {
      expect(handler.create).toBeDefined()
    })

    it('create method should add a new product for order 1 and returns its data', async () => {
      const op: OrderProduct = new OrderProduct()
      op.product_id = 1
      op.quantity = 1
      op.order_id = 1

      await handler
        .create(1, op)
        .then((result) => {
          expect(result.id).toEqual(1)
          expect(result.order_id).toEqual(1)
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })

    it('create method should add a new product for order 1 and returns its data', async () => {
      const op: OrderProduct = new OrderProduct()
      op.product_id = 3
      op.quantity = 2
      op.order_id = 1

      await handler
        .create(1, op)
        .then((result) => {
          expect(result.id).toEqual(2)
          expect(result.order_id).toEqual(1)
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })

    it('create method should add a new product for order 2 and returns its data', async () => {
      const op: OrderProduct = new OrderProduct()
      op.product_id = 2
      op.quantity = 1
      op.order_id = 2

      await handler
        .create(1, op)
        .then((result) => {
          expect(result.id).toEqual(3)
          expect(result.order_id).toEqual(2)
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })

    it('create method should add a new product for order 2 and returns its data', async () => {
      const op: OrderProduct = new OrderProduct()
      op.product_id = 4
      op.quantity = 2
      op.order_id = 2

      await handler
        .create(1, op)
        .then((result) => {
          expect(result.id).toEqual(4)
          expect(result.order_id).toEqual(2)
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })

    it('create method should add a new product for order 2 and returns its data', async () => {
      const op: OrderProduct = new OrderProduct()
      op.product_id = 1
      op.quantity = 1
      op.order_id = 1

      await handler
        .create(1, op)
        .then((result) => {
          expect(result.id).toEqual(5)
          expect(result.order_id).toEqual(1)
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })
  })

  describe('loadAll method', () => {
    it('loadAll method should return array of all order products with length 5', async () => {
      await handler
        .loadAll()
        .then((result) => {
          expect(result.length).toEqual(5)
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })
  })

  describe('loadAllByOrder method', () => {
    it('loadAllByOrder method should return array of products for order 1 with length 3', async () => {
      await handler
        .loadAllByOrder(1, 1)
        .then((result) => {
          console.log(result)
          expect(result.length).toEqual(3)
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })
  })

  describe('loadAllByOrder method', () => {
    it('loadAllByOrder method should return array of products for order 2 with length 2', async () => {
      await handler
        .loadAllByOrder(1, 2)
        .then((result) => {
          console.log(result)
          expect(result.length).toEqual(2)
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })
  })

  describe('Load method', () => {
    it('OrderProductsHandler should have an load method', () => {
      expect(handler.load).toBeDefined()
    })

    it('load method should load order product with id 1 and returns its data', async () => {
      await handler
        .load(1, 1, 1)
        .then((result) => {
          console.log(result)
          expect(result.id).toEqual(1)
          expect(result.category_id).toEqual(1)
          expect(result.category_name).toEqual('Smart Phones Category')
          expect(result.order_id).toEqual(1)
          expect(result.price).toEqual(4500)
          expect(result.product_id).toEqual(1)
          expect(result.product_name).toEqual('Samsung Galaxy Dual Sim')
          expect(result.quantity).toEqual(1)
          expect(result.total_price).toEqual(4500)
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })

    it('load method should load order product with id 2 and returns its data', async () => {
      await handler
        .load(1, 1, 2)
        .then((result) => {
          console.log(result)
          expect(result.id).toEqual(2)
          expect(result.category_id).toEqual(2)
          expect(result.category_name).toEqual('Computers Category')
          expect(result.order_id).toEqual(1)
          expect(result.price).toEqual(8750)
          expect(result.product_id).toEqual(3)
          expect(result.product_name).toEqual('Laptop DELL Inspiron 5800')
          expect(result.quantity).toEqual(2)
          expect(result.total_price).toEqual(17500)
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })

    it('load method should load order product with id 3 and returns its data', async () => {
      await handler
        .load(1, 2, 3)
        .then((result) => {
          console.log(result)
          expect(result.id).toEqual(3)
          expect(result.category_id).toEqual(1)
          expect(result.category_name).toEqual('Smart Phones Category')
          expect(result.order_id).toEqual(2)
          expect(result.price).toEqual(4999)
          expect(result.product_id).toEqual(2)
          expect(result.product_name).toEqual('Oppo A74')
          expect(result.quantity).toEqual(1)
          expect(result.total_price).toEqual(4999)
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })

    it('load method should load order product with id 4 and returns its data', async () => {
      await handler
        .load(1, 2, 4)
        .then((result) => {
          console.log(result)
          expect(result.id).toEqual(4)
          expect(result.category_id).toEqual(2)
          expect(result.category_name).toEqual('Computers Category')
          expect(result.order_id).toEqual(2)
          expect(result.price).toEqual(6700)
          expect(result.product_id).toEqual(4)
          expect(result.product_name).toEqual('HP Crown PC')
          expect(result.quantity).toEqual(2)
          expect(result.total_price).toEqual(13400)
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })

    it('load method should load order product with id 5 and returns its data', async () => {
      await handler
        .load(1, 1, 5)
        .then((result) => {
          console.log(result)
          expect(result.id).toEqual(5)
          expect(result.category_id).toEqual(1)
          expect(result.category_name).toEqual('Smart Phones Category')
          expect(result.order_id).toEqual(1)
          expect(result.price).toEqual(4500)
          expect(result.product_id).toEqual(1)
          expect(result.product_name).toEqual('Samsung Galaxy Dual Sim')
          expect(result.quantity).toEqual(1)
          expect(result.total_price).toEqual(4500)
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })
  })

  describe('Edit method', () => {
    it('OrderProductsHandler should have an edit method', () => {
      expect(handler.edit).toBeDefined()
    })

    it('load method should edit order product with id 5 and returns its data', async () => {
      const op: OrderProduct = new OrderProduct()
      op.id = 5
      op.product_id = 3
      op.quantity = 1
      op.order_id = 1

      await handler
        .edit(1, op)
        .then((result) => {
          console.log(result)
          expect(result.id).toEqual(5)
          expect(result.product_id).toEqual(3)
          expect(result.quantity).toEqual(1)
          expect(result.order_id).toEqual(1)
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })
  })

  describe('Delete method', () => {
    it('OrderHandler should have an delete method', () => {
      expect(handler.delete).toBeDefined()
    })

    it('delete method should delete this order and returns with success for deletion.', async () => {
      await handler.delete(1, 1, 2).then((result) => {
        expect(result).toBeTrue()
      })
    })
  })
})

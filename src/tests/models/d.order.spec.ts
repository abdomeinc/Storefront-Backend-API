import { OrderHandler } from '../../models/Order'
import dotenv from 'dotenv'
import { SystemLogger } from '../../utilities/systemLogger'
import { OrderStatus } from '../../helpers/enums'

dotenv.config()
const handler = new OrderHandler()

describe('Order Model', () => {
  // beforeAll(() => {
  //   process.env.ENV = 'test'
  // })
  // afterAll(() => {
  //   process.env.ENV = 'dev'
  // })
  describe('loadAll method', () => {
    it('OrderHandler should have an loadAll method', async () => {
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
    it('OrderHandler should have an create method', () => {
      expect(handler.create).toBeDefined()
    })

    it('create method should add a new order for user 1 and returns its data', async () => {
      await handler
        .create(1)
        .then((result) => {
          expect(result.id).toEqual(1)
          expect(result.user_id).toEqual(1)
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })

    it('create method should add a new order for user 1 and returns its data', async () => {
      await handler
        .create(1)
        .then((result) => {
          expect(result.id).toEqual(2)
          expect(result.user_id).toEqual(1)
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })

    it('create method should add a new order for user 2 and returns its data', async () => {
      await handler
        .create(2)
        .then((result) => {
          expect(result.id).toEqual(3)
          expect(result.user_id).toEqual(2)
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })

    it('create method should add a new order for user 2 and returns its data', async () => {
      await handler
        .create(2)
        .then((result) => {
          expect(result.id).toEqual(4)
          expect(result.user_id).toEqual(2)
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })
  })

  describe('loadAll method', () => {
    it('loadAll method should return array of all orders with length 4', async () => {
      await handler
        .loadAll()
        .then((result) => {
          expect(result.length).toEqual(4)
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })
  })

  describe('loadAll method', () => {
    it('loadAll method should return array of orders for user 1 with length 2', async () => {
      await handler
        .loadAllByUser(1)
        .then((result) => {
          expect(result.length).toEqual(2)
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })
  })

  describe('loadAll method', () => {
    it('loadAll method should return array of orders for user 2 with length 2', async () => {
      await handler
        .loadAllByUser(2)
        .then((result) => {
          expect(result.length).toEqual(2)
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })
  })

  describe('Load method', () => {
    it('OrderHandler should have an load method', () => {
      expect(handler.load).toBeDefined()
    })

    it('load method should load order with id 1 and returns its data', async () => {
      await handler
        .load(1)
        .then((result) => {
          console.log(result)
          expect(result.id).toEqual(1)
          expect(result.order_status).toEqual(1)
          expect(result.user_id).toEqual(1)
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })

    it('load method should load order with id 2 and returns its data', async () => {
      await handler
        .load(2)
        .then((result) => {
          console.log(result)
          expect(result.id).toEqual(2)
          expect(result.order_status).toEqual(1)
          expect(result.user_id).toEqual(1)
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })

    it('load method should load order with id 3 and returns its data', async () => {
      await handler
        .load(3)
        .then((result) => {
          console.log(result)
          expect(result.id).toEqual(3)
          expect(result.order_status).toEqual(1)
          expect(result.products_count as unknown).toEqual('0')
          expect(result.user_id).toEqual(2)
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })

    it('load method should load order with id 4 and returns its data', async () => {
      await handler
        .load(4)
        .then((result) => {
          console.log(result)
          expect(result.id).toEqual(4)
          expect(result.order_status).toEqual(1)
          expect(result.products_count as unknown).toEqual('0')
          expect(result.user_id).toEqual(2)
        })
        .catch((error) => {
          SystemLogger.log(error as string)
        })
    })
  })

  describe('Edit method', () => {
    it('OrderHandler should have an edit method', () => {
      expect(handler.edit).toBeDefined()
    })

    it('edit method should edit order 3 and returns its data', async () => {
      await handler.edit(3, 2, OrderStatus.COMPLETE).then((result) => {
        expect(result.order_status).toEqual(OrderStatus.COMPLETE)
        expect(result.user_id).toEqual(2)
      })
    })

    it('edit method should edit order 4 and returns its data', async () => {
      await handler.edit(4, 2, OrderStatus.COMPLETE).then((result) => {
        expect(result.order_status).toEqual(OrderStatus.COMPLETE)
        expect(result.user_id).toEqual(2)
      })
    })
  })

  describe('Delete method', () => {
    it('OrderHandler should have an delete method', () => {
      expect(handler.delete).toBeDefined()
    })

    it('delete method should delete this order 3 for user 2 and returns with success for deletion.', async () => {
      await handler.delete(2, 3).then((result) => {
        expect(result).toBeTrue()
      })
    })
  })
})

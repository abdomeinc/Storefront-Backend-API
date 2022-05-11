// import the modules that will be use in here
import express from 'express'
import { OrderProduct, OrderProductsHandler } from '../../models/OrderProduct'
import { SystemLogger } from '../../utilities/systemLogger'
import { Validator } from '../../utilities/validator'

export class OrderProducts {
  static orderProductHandler = new OrderProductsHandler();

  static loadAll = async (req: express.Request, res: express.Response) => {
    const user_id: number = <number>(req.params.user_id as unknown)
    const order_id: number = <number>(req.params.order_id as unknown)

    await this.orderProductHandler
      .loadAllByOrder(user_id, order_id)
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((catchedError) => {
        SystemLogger.log(catchedError as string)
        res.status(400).json({ Error: (catchedError as Error).message })
      })
  };

  static load = async (req: express.Request, res: express.Response) => {
    const user_id: number = <number>(req.params.user_id as unknown)
    const order_id: number = <number>(req.params.order_id as unknown)
    const id: number = <number>(req.params.id as unknown)

    await this.orderProductHandler
      .load(user_id, order_id, id)
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((catchedError) => {
        SystemLogger.log(catchedError as string)
        res.status(400).json({ Error: (catchedError as Error).message })
      })
  };

  static create = async (req: express.Request, res: express.Response) => {
    const user_id: number = <number>(req.params.user_id as unknown)
    const order_id: number = <number>(req.params.order_id as unknown)
    const product_id: number = <number>(req.body.product_id as unknown)
    const quantity: number = <number>(req.body.quantity as unknown)

    const order_product: OrderProduct = new OrderProduct()
    order_product.order_id = order_id
    order_product.quantity = quantity
    order_product.product_id = product_id

    await this.orderProductHandler
      .create(user_id, order_product)
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((catchedError) => {
        SystemLogger.log(catchedError as string)
        res.status(400).json({ Error: (catchedError as Error).message })
      })
  };

  static edit = async (req: express.Request, res: express.Response) => {
    const user_id: number = <number>(req.params.user_id as unknown)
    const order_id: number = <number>(req.params.order_id as unknown)
    const id: number = <number>(req.params.id as unknown)

    const product_id: number = <number>(req.body.product_id as unknown)
    const quantity: number = <number>(req.body.quantity as unknown)

    const order_product: OrderProduct = new OrderProduct()
    order_product.id = id
    order_product.order_id = order_id
    order_product.quantity = quantity
    order_product.product_id = product_id

    await this.orderProductHandler
      .edit(user_id, order_product)
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((catchedError) => {
        SystemLogger.log(catchedError as string)
        res.status(400).json({ Error: (catchedError as Error).message })
      })
  };

  static delete = async (req: express.Request, res: express.Response) => {
    const user_id: number = <number>(req.params.user_id as unknown)
    const order_id: number = <number>(req.params.order_id as unknown)
    const id: number = <number>(req.params.id as unknown)

    await this.orderProductHandler
      .delete(user_id, order_id, id)
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((catchedError) => {
        SystemLogger.log(catchedError as string)
        res.status(400).json({ Error: (catchedError as Error).message })
      })
  };

  static initialize = async (app: express.Application) => {
    /// api/eshop/users/:user_id/orders/:order_id/products
    app.get(
      '/api/eshop/users/:user_id/orders/:order_id/products',
      [
        Validator.RequestParam.check(['user_id', 'order_id']),
        Validator.AuthToken.verify(true, false)
      ],
      this.loadAll
    )
    /// api/eshop/users/:user_id/orders/:order_id/products/:id
    app.get(
      '/api/eshop/users/:user_id/orders/:order_id/products/:id',
      [
        Validator.RequestParam.check(['user_id', 'order_id', 'id']),
        Validator.AuthToken.verify(true, false)
      ],
      this.load
    )
    /// api/eshop/users/:user_id/orders/:order_id/products/create
    app.post(
      '/api/eshop/users/:user_id/orders/:order_id/products/create',
      [
        Validator.RequestParam.check(['user_id', 'order_id']),
        Validator.RequestBody.check(['product_id', 'quantity']),
        Validator.AuthToken.verify(true, false)
      ],
      this.create
    )
    /// api/eshop/users/:user_id/orders/:order_id/products/:id/edit
    app.put(
      '/api/eshop/users/:user_id/orders/:order_id/products/:id/edit',
      [
        Validator.RequestParam.check(['user_id', 'order_id', 'id']),
        Validator.RequestBody.check(['product_id', 'quantity']),
        Validator.AuthToken.verify(true, false)
      ],
      this.edit
    )
    /// api/eshop/users/:user_id/orders/:order_id/products/:id/delete
    app.delete(
      '/api/eshop/users/:user_id/orders/:order_id/products/:id/delete',
      [
        Validator.RequestParam.check(['user_id', 'order_id', 'id']),
        Validator.AuthToken.verify(true, false)
      ],
      this.delete
    )
  };
}

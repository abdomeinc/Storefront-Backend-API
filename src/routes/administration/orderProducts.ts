// import the modules that will be use in here
import express from 'express'
import { OrderProductsHandler } from '../../models/OrderProduct'
import { SystemLogger } from '../../utilities/systemLogger'
import { Validator } from '../../utilities/validator'

export class AdminOrderProducts {
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
    /// api/users/:user_id/orders/:order_id/products
    app.get(
      '/api/administration/eshop/users/:user_id/orders/:order_id/products',
      [
        Validator.RequestParam.check(['user_id', 'order_id']),
        Validator.AuthToken.verify(false, true)
      ],
      this.loadAll
    )
    /// api/users/:user_id/orders/:order_id/products/:id
    app.get(
      '/api/administration/eshop/users/:user_id/orders/:order_id/products/:id',
      [
        Validator.RequestParam.check(['user_id', 'order_id', 'id']),
        Validator.AuthToken.verify(false, true)
      ],
      this.load
    )
    /// api/users/:user_id/orders/:order_id/products/:id/delete
    app.delete(
      '/api/administration/eshop/users/:user_id/orders/:order_id/products/:id/delete',
      [
        Validator.RequestParam.check(['user_id', 'order_id', 'id']),
        Validator.AuthToken.verify(false, true)
      ],
      this.delete
    )
  };
}

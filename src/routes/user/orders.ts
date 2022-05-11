// import the modules that will be use in here
import express from 'express'
import { OrderStatus } from '../../helpers/enums'
import { OrderHandler } from '../../models/Order'
import { SystemLogger } from '../../utilities/systemLogger'
import { Validator } from '../../utilities/validator'

export class Orders {
  static orderHandler = new OrderHandler();

  static loadAllByUser = async (
    req: express.Request,
    res: express.Response
  ) => {
    const user_id: number = <number>(req.params.user_id as unknown)

    await this.orderHandler
      .loadAllByUser(user_id)
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((catchedError) => {
        SystemLogger.log(catchedError as string)
        res.status(400).json({ Error: (catchedError as Error).message })
      })
  };

  static loadByUser = async (req: express.Request, res: express.Response) => {
    const user_id: number = <number>(req.params.user_id as unknown)
    const id: number = <number>(req.params.id as unknown)

    await this.orderHandler
      .loadByUser(user_id, id)
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

    await this.orderHandler
      .create(user_id)
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((catchedError) => {
        SystemLogger.log(catchedError as string)
        res.status(400).json({ Error: (catchedError as Error).message })
      })
  };

  static complete = async (req: express.Request, res: express.Response) => {
    const user_id: number = <number>(req.params.user_id as unknown)
    const id: number = <number>(req.params.id as unknown)
    const order_status: OrderStatus = <number>(
      (req.body.order_status as unknown)
    )

    await this.orderHandler
      .edit(id, user_id, order_status)
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((catchedError) => {
        SystemLogger.log(catchedError as string)
        res.status(400).json({ Error: (catchedError as Error).message })
      })
  };

  static deleteByUser = async (req: express.Request, res: express.Response) => {
    const user_id: number = <number>(req.params.user_id as unknown)
    const id: number = <number>(req.params.id as unknown)

    await this.orderHandler
      .deleteByUser(user_id, id)
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((catchedError) => {
        SystemLogger.log(catchedError as string)
        res.status(400).json({ Error: (catchedError as Error).message })
      })
  };

  static initialize = async (app: express.Application) => {
    /// api/eshop/users/:user_id/orders/
    app.get(
      '/api/eshop/users/:user_id/orders',
      [
        Validator.RequestParam.check(['user_id']),
        Validator.AuthToken.verify(true, false)
      ],
      this.loadAllByUser
    )
    /// api/eshop/users/:user_id/orders/:id
    app.get(
      '/api/eshop/users/:user_id/orders/:id',
      [
        Validator.RequestParam.check(['user_id', 'id']),
        Validator.AuthToken.verify(true, false)
      ],
      this.loadByUser
    )
    /// api/eshop/users/:user_id/orders/create
    app.post(
      '/api/eshop/users/:user_id/orders/create',
      [
        Validator.RequestParam.check(['user_id']),
        Validator.AuthToken.verify(true, false)
      ],
      this.create
    )
    /// api/eshop/users/:user_id/orders/:id/complete
    app.put(
      '/api/eshop/users/:user_id/orders/:id/complete',
      [
        Validator.RequestParam.check(['user_id', 'id']),
        Validator.RequestBody.check(['order_status']),
        Validator.AuthToken.verify(true, false)
      ],
      this.complete
    )
    /// api/eshop/users/:user_id/orders/:id/delete
    app.delete(
      '/api/eshop/users/:user_id/orders/:id/delete',
      [
        Validator.RequestParam.check(['user_id', 'id']),
        Validator.AuthToken.verify(true, false)
      ],
      this.deleteByUser
    )
  };
}

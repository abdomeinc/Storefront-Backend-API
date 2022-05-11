// import the modules that will be use in here
import express from 'express'
import { OrderHandler } from '../../models/Order'
import { SystemLogger } from '../../utilities/systemLogger'
import { Validator } from '../../utilities/validator'

export class AdminOrders {
  static orderHandler = new OrderHandler();

  static loadAllAdmin = async (
    _req: express.Request,
    res: express.Response
  ) => {
    await this.orderHandler
      .loadAll()
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((catchedError) => {
        SystemLogger.log(catchedError as string)
        res.status(400).json({ Error: (catchedError as Error).message })
      })
  };

  static deleteAdmin = async (req: express.Request, res: express.Response) => {
    const user_id: number = <number>(req.params.user_id as unknown)
    const id: number = <number>(req.params.id as unknown)

    await this.orderHandler
      .delete(user_id, id)
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((catchedError) => {
        SystemLogger.log(catchedError as string)
        res.status(400).json({ Error: (catchedError as Error).message })
      })
  };

  static loadAll = async (req: express.Request, res: express.Response) => {
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

  static load = async (req: express.Request, res: express.Response) => {
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

  static delete = async (req: express.Request, res: express.Response) => {
    const user_id: number = <number>(req.params.user_id as unknown)
    const id: number = <number>(req.params.id as unknown)

    await this.orderHandler
      .delete(user_id, id)
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((catchedError) => {
        SystemLogger.log(catchedError as string)
        res.status(400).json({ Error: (catchedError as Error).message })
      })
  };

  static initialize = async (app: express.Application) => {
    app.get(
      '/api/administration/eshop/orders',
      [Validator.AuthToken.verify(false, true)],
      this.loadAllAdmin
    )
    app.delete(
      '/api/administration/eshop/users/:user_id/orders/:id/delete',
      [
        Validator.RequestParam.check(['user_id', 'id']),
        Validator.AuthToken.verify(false, true)
      ],
      this.deleteAdmin
    )

    app.get(
      '/api/administration/eshop/users/:user_id/orders',
      [
        Validator.RequestParam.check(['user_id']),
        Validator.AuthToken.verify(false, true)
      ],
      this.loadAll
    )
    app.get(
      '/api/administration/eshop/users/:user_id/orders/:id',
      [
        Validator.RequestParam.check(['user_id', 'id']),
        Validator.AuthToken.verify(false, true)
      ],
      this.load
    )
    app.delete(
      '/api/administration/eshop/users/:user_id/orders/:id/delete',
      [
        Validator.RequestParam.check(['user_id', 'id']),
        Validator.AuthToken.verify(false, true)
      ],
      this.delete
    )
  };
}

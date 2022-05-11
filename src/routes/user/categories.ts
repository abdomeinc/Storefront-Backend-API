import express from 'express'
import { CategoryHandler } from '../../models/Category'
import { SystemLogger } from '../../utilities/systemLogger'
import { Validator } from '../../utilities/validator'

export class Categories {
  static categoryHandler = new CategoryHandler();

  static loadAll = async (_req: express.Request, res: express.Response) => {
    await this.categoryHandler
      .loadAll()
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((catchedError) => {
        SystemLogger.log(catchedError as string)
        res.status(400).json({ Error: (catchedError as Error).message })
      })
  };

  static load = async (req: express.Request, res: express.Response) => {
    const id: number = <number>(req.params.id as unknown)

    await this.categoryHandler
      .load(id)
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        res.status(400).send((err as Error).message)
      })
  };

  static initialize = async (app: express.Application) => {
    app.get('/api/eshop/categories', this.loadAll)
    app.get(
      '/api/eshop/categories/:id',
      [Validator.RequestParam.check(['id'])],
      this.load
    )
  };
}

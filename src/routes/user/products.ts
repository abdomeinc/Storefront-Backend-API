// import the modules that will be use in here
import express from 'express'
import { ProductHandler } from '../../models/Product'
import { SystemLogger } from '../../utilities/systemLogger'
import { Validator } from '../../utilities/validator'

export class Products {
  static productHandler = new ProductHandler();

  static loadAll = async (req: express.Request, res: express.Response) => {
    const category_id: number = <number>(req.params.category_id as unknown)

    await this.productHandler
      .loadAll(category_id)
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((catchedError) => {
        SystemLogger.log(catchedError as string)
        res.status(400).json({ Error: (catchedError as Error).message })
      })
  };

  static load = async (req: express.Request, res: express.Response) => {
    const category_id: number = <number>(req.params.category_id as unknown)
    const id: number = <number>(req.params.id as unknown)

    await this.productHandler
      .load(category_id, id)
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((catchedError) => {
        SystemLogger.log(catchedError as string)
        res.status(400).json({ Error: (catchedError as Error).message })
      })
  };

  static initialize = async (app: express.Application) => {
    /// api/eshop/categories/:category_id/products
    app.get(
      '/api/eshop/categories/:category_id/products',
      [Validator.RequestParam.check(['category_id'])],
      this.loadAll
    )
    /// api/eshop/categories/:category_id/products/:id
    app.get(
      '/api/eshop/categories/:category_id/products/:id',
      [Validator.RequestParam.check(['category_id', 'id'])],
      this.load
    )
  };
}

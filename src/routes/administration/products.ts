// import the modules that will be use in here
import express from 'express'
import { Product, ProductHandler } from '../../models/Product'
import { SystemLogger } from '../../utilities/systemLogger'
import { Validator } from '../../utilities/validator'

export class AdminProducts {
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

  static create = async (req: express.Request, res: express.Response) => {
    const category_id: number = <number>(req.params.category_id as unknown)
    const name: string = req.body.name as string
    const price: number = <number>(req.body.price as unknown)

    const product: Product = new Product(0)
    product.category_id = category_id
    product.name = name
    product.price = price

    await this.productHandler
      .create(product)
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((catchedError) => {
        SystemLogger.log(catchedError as string)
        res.status(400).json({ Error: (catchedError as Error).message })
      })
  };

  static edit = async (req: express.Request, res: express.Response) => {
    const id: number = <number>(req.params.id as unknown)
    const category_id: number = <number>(req.params.category_id as unknown)
    const name: string = req.body.name as string
    const price: number = <number>(req.body.price as unknown)

    const product: Product = new Product(id)
    product.id = id
    product.category_id = category_id
    product.name = name
    product.price = price

    await this.productHandler
      .edit(product)
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((catchedError) => {
        SystemLogger.log(catchedError as string)
        res.status(400).json({ Error: (catchedError as Error).message })
      })
  };

  static delete = async (req: express.Request, res: express.Response) => {
    const category_id: number = <number>(req.params.category_id as unknown)
    const id: number = <number>(req.params.id as unknown)

    await this.productHandler
      .delete(category_id, id)
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((catchedError) => {
        SystemLogger.log(catchedError as string)
        res.status(400).json({ Error: (catchedError as Error).message })
      })
  };

  static initialize = async (app: express.Application) => {
    /// api/administration/eshop/categories/:category_id/products
    app.get(
      '/api/administration/eshop/categories/:category_id/products',
      [
        Validator.RequestParam.check(['category_id']),
        Validator.AuthToken.verify(false, false)
      ],
      this.loadAll
    )
    /// api/administration/eshop/categories/:category_id/products/:id
    app.get(
      '/api/administration/eshop/categories/:category_id/products/:id',
      [
        Validator.RequestParam.check(['category_id', 'id']),
        Validator.AuthToken.verify(false, false)
      ],
      this.load
    )
    /// api/administration/eshop/categories/:category_id/products/create
    app.post(
      '/api/administration/eshop/categories/:category_id/products/create',
      [
        Validator.RequestParam.check(['category_id']),
        Validator.RequestBody.check(['name', 'price']),
        Validator.AuthToken.verify(false, false)
      ],
      this.create
    )
    /// api/administration/eshop/categories/:category_id/products/:id/edit
    app.put(
      '/api/administration/eshop/categories/:category_id/products/:id/edit',
      [
        Validator.RequestParam.check(['category_id', 'id']),
        Validator.RequestBody.check(['name', 'price']),
        Validator.AuthToken.verify(false, false)
      ],
      this.edit
    )
    /// api/administration/eshop/categories/:category_id/products/:id/delete
    app.delete(
      '/api/administration/eshop/categories/:category_id/products/:id/delete',
      [
        Validator.RequestParam.check(['category_id', 'id']),
        Validator.AuthToken.verify(false, false)
      ],
      this.delete
    )
  };
}

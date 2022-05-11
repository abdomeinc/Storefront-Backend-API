import express from 'express'
import { CategoryHandler } from '../../models/Category'
import { SystemLogger } from '../../utilities/systemLogger'
import { Validator } from '../../utilities/validator'

export class AdminCategories {
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

  static create = async (req: express.Request, res: express.Response) => {
    const name: string = req.body.name as string

    await this.categoryHandler
      .create(name)
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        res.status(400).send((err as Error).message)
      })
  };

  static edit = async (req: express.Request, res: express.Response) => {
    const id: number = <number>(req.params.id as unknown)
    const name: string = req.body.name as string

    await this.categoryHandler
      .edit(id, name)
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        res.status(400).send((err as Error).message)
      })
  };

  static delete = async (req: express.Request, res: express.Response) => {
    const id: number = <number>(req.params.id as unknown)

    await this.categoryHandler
      .delete(id)
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        res.status(400).send((err as Error).message)
      })
  };

  static initialize = async (app: express.Application) => {
    app.get(
      '/api/administration/eshop/categories',
      [Validator.AuthToken.verify(false, true)],
      this.loadAll
    )
    app.get(
      '/api/administration/eshop/categories/:id',
      [
        Validator.RequestParam.check(['id']),
        Validator.AuthToken.verify(false, true)
      ],
      this.load
    )
    app.post(
      '/api/administration/eshop/categories/create',
      [
        Validator.RequestBody.check(['name']),
        Validator.AuthToken.verify(false, true)
      ],
      this.create
    )
    app.put(
      '/api/administration/eshop/categories/:id/edit',
      [
        Validator.RequestParam.check(['id']),
        Validator.RequestBody.check(['name']),
        Validator.AuthToken.verify(false, true)
      ],
      this.edit
    )
    app.delete(
      '/api/administration/eshop/categories/:id/delete',
      [
        Validator.RequestParam.check(['id']),
        Validator.AuthToken.verify(false, true)
      ],
      this.delete
    )
  };
}

// import the modules that will be use in here
import express from 'express'
import { User, UserHandler } from '../../models/User'
import { SystemLogger } from '../../utilities/systemLogger'
import { Validator } from '../../utilities/validator'

export class AdminUsers {
  static userHandler = new UserHandler();

  static loadAll = async (_req: express.Request, res: express.Response) => {
    await this.userHandler
      .loadAll()
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((catchedError) => {
        SystemLogger.log(catchedError as string)
        res.status(400).json({ Error: (catchedError as Error).message })
      })
  };

  static loadAllAdmins = async (
    _req: express.Request,
    res: express.Response
  ) => {
    await this.userHandler
      .loadAllBy(true)
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((catchedError) => {
        SystemLogger.log(catchedError as string)
        res.status(400).json({ Error: (catchedError as Error).message })
      })
  };

  static loadAllNonAdmins = async (
    _req: express.Request,
    res: express.Response
  ) => {
    await this.userHandler
      .loadAllBy(false)
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

    await this.userHandler
      .load(id)
      .then((result) => {
        result.password = ''
        res.status(200).json(result)
      })
      .catch((catchedError) => {
        SystemLogger.log(catchedError as string)
        res.status(400).json({ Error: (catchedError as Error).message })
      })
  };

  static create = async (req: express.Request, res: express.Response) => {
    const first_name: string = req.body.first_name as string
    const last_name: string = req.body.last_name as string
    const email: string = req.body.email as string
    const password: string = req.body.password as string

    const user: User = new User()
    user.first_name = first_name
    user.last_name = last_name
    user.email = email
    user.password = password
    user.is_admin = true

    await this.userHandler
      .create(user)
      .then((result) => {
        result.password = ''
        res.status(200).json(result)
      })
      .catch((catchedError) => {
        SystemLogger.log(catchedError as string)
        res.status(400).json({ Error: (catchedError as Error).message })
      })
  };

  static delete = async (req: express.Request, res: express.Response) => {
    const id: number = <number>(req.params.id as unknown)

    await this.userHandler
      .delete(id)
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((catchedError) => {
        SystemLogger.log(catchedError as string)
        res.status(400).json({ Error: (catchedError as Error).message })
      })
  };

  static initialize = async (app: express.Application) => {
    /// api/administration/management/users
    app.get(
      '/api/administration/management/users',
      [Validator.AuthToken.verify(false, true)],
      this.loadAll
    )
    /// api/administration/management/users/admins
    app.get(
      '/api/administration/management/users/admins',
      [Validator.AuthToken.verify(false, true)],
      this.loadAllAdmins
    )
    /// api/administration/management/users/non-admins
    app.get(
      '/api/administration/management/users/non-admins',
      [Validator.AuthToken.verify(false, true)],
      this.loadAllNonAdmins
    )
    /// api/administration/management/users/create
    app.post(
      '/api/administration/management/users/create',
      Validator.RequestBody.check([
        'first_name',
        'last_name',
        'email',
        'password'
      ]),
      this.create
    )
    /// api/administration/management/users/:id/delete
    app.delete(
      '/api/administration/management/users/:id/delete',
      [Validator.AuthToken.verify(false, true)],
      this.delete
    )
  };
}

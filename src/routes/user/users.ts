// import the modules that will be use in here
import express from 'express'
import { User, UserHandler } from '../../models/User'
import { SystemLogger } from '../../utilities/systemLogger'
import jwt from 'jsonwebtoken'
import { Validator } from '../../utilities/validator'

export class Users {
  static userHandler = new UserHandler();

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
    user.is_admin = false

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

  static edit = async (req: express.Request, res: express.Response) => {
    const id: number = <number>(req.params.id as unknown)
    const first_name: string = req.body.first_name as string
    const last_name: string = req.body.last_name as string

    await this.userHandler
      .edit(id, first_name, last_name)
      .then((result) => {
        result.password = ''
        res.status(200).json(result)
      })
      .catch((catchedError) => {
        SystemLogger.log(catchedError as string)
        res.status(400).json({ Error: (catchedError as Error).message })
      })
  };

  static auth = async (req: express.Request, res: express.Response) => {
    const email: string = req.body.email as string
    const password: string = req.body.password as string

    await this.userHandler
      .authenticate(email, password)
      .then((result) => {
        result.password = ''
        try {
          const token = jwt.sign(
            { user: result },
            process.env.TOKEN_SECRET as string
          )
          res.status(200).json(token)
        } catch (err) {
          SystemLogger.log(err as string)
          res.status(400).send((err as Error).message)
        }
      })
      .catch((catchedError) => {
        SystemLogger.log(catchedError as string)
        res.status(400).json({ Error: (catchedError as Error).message })
      })
  };

  static initialize = async (app: express.Application) => {
    /// api/eshop/users/:id
    app.get(
      '/api/eshop/users/:id',
      [Validator.AuthToken.verify(false, false)],
      this.load
    )
    /// api/eshop/users/create
    app.post(
      '/api/eshop/users/create',
      Validator.RequestBody.check([
        'first_name',
        'last_name',
        'email',
        'password'
      ]),
      this.create
    )
    /// api/eshop/users/:id/edit
    app.put(
      '/api/eshop/users/:id/edit',
      [
        Validator.RequestBody.check(['first_name', 'last_name']),
        Validator.AuthToken.verify(true, false)
      ],
      this.edit
    )
    /// api/eshop/users/authenticate
    app.post(
      '/api/eshop/users/authenticate',
      Validator.RequestBody.check(['email', 'password']),
      this.auth
    )
  };
}

import express from 'express'
import { SystemLogger } from './systemLogger'
import jwt from 'jsonwebtoken'
import { UserHandler } from '../models/User'

export class Validator {
  static isDigits (input: string): boolean {
    return /^\d+$/.test(input)
  }

  static isEmail (email: string): boolean {
    const prefix: RegExp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return prefix.test(email)
  }

  static keysArray = [
    'id',
    'user_id',
    'category_id',
    'product_id',
    'order_id',
    'order_product_id',
    'quantity',
    'price'
  ];

  static RequestQuery = class {
    static getKeyValue (req: express.Request, input: string): string {
      switch (input) {
        case 'id':
          return req.query.id as string
        case 'user_id':
          return req.query.user_id as string
        case 'category_id':
          return req.query.category_id as string
        case 'product_id':
          return req.query.product_id as string
        case 'order_id':
          return req.query.order_id as string
        case 'order_product_id':
          return req.query.order_product_id as string
        case 'quantity':
          return req.query.quantity as string
        case 'price':
          return req.query.price as string
        default:
          return ''
      }
    }

    static check = (fields: string[]) => {
      return (req: express.Request, res: express.Response, next: Function) => {
        if (req.query === undefined) {
          SystemLogger.log('query is missing')
          return res.status(400).send('query is missing')
        }
        for (const field of fields) {
          if (!req.query[field]) {
            SystemLogger.log(`${field} is missing`)
            return res.status(400).send(`${field} is missing`)
          } else {
            const index = Validator.keysArray.indexOf(field)
            if (index > -1) {
              const keyValue = this.getKeyValue(req, field)
              if (!Validator.isDigits(keyValue)) {
                SystemLogger.log(`${field} is not a valid number`)
                return res.status(400).send(`${field} is not a valid number`)
              }
            }
          }
        }
        next()
      }
    };
  };

  static RequestBody = class {
    static getKeyValue (req: express.Request, input: string): string {
      switch (input) {
        case 'id':
          return req.body.id as string
        case 'user_id':
          return req.body.user_id as string
        case 'category_id':
          return req.body.category_id as string
        case 'product_id':
          return req.body.product_id as string
        case 'order_id':
          return req.body.order_id as string
        case 'order_product_id':
          return req.body.order_product_id as string
        case 'quantity':
          return req.body.quantity as string
        case 'price':
          return req.body.price as string
        default:
          return ''
      }
    }

    static check = (fields: string[]) => {
      return (req: express.Request, res: express.Response, next: Function) => {
        if (req.body === undefined) {
          SystemLogger.log('body is missing')
          return res.status(400).send('body is missing')
        }
        for (const field of fields) {
          if (!req.body[field]) {
            SystemLogger.log(`${field} is missing`)
            return res.status(400).send(`${field} is missing`)
          } else {
            const index = Validator.keysArray.indexOf(field)
            if (index > -1) {
              const keyValue = this.getKeyValue(req, field)
              if (!Validator.isDigits(keyValue)) {
                SystemLogger.log(`${field} is not a valid number`)
                return res.status(400).send(`${field} is not a valid number`)
              }
            }
          }
        }
        next()
      }
    };
  };

  static RequestParam = class {
    static getKeyValue (req: express.Request, input: string): string {
      switch (input) {
        case 'id':
          return req.params.id as string
        case 'user_id':
          return req.params.user_id as string
        case 'category_id':
          return req.params.category_id as string
        case 'product_id':
          return req.params.product_id as string
        case 'order_id':
          return req.params.order_id as string
        case 'order_product_id':
          return req.params.order_product_id as string
        case 'quantity':
          return req.params.quantity as string
        case 'price':
          return req.params.price as string
        default:
          return ''
      }
    }

    static check = (fields: string[]) => {
      return (req: express.Request, res: express.Response, next: Function) => {
        if (req.params === undefined) {
          SystemLogger.log('params is missing')
          return res.status(400).send('params is missing')
        }
        for (const field of fields) {
          if (!req.params[field]) {
            SystemLogger.log(`${field} is missing`)
            return res.status(400).send(`${field} is missing`)
          } else {
            const index = Validator.keysArray.indexOf(field)
            if (index > -1) {
              const keyValue = this.getKeyValue(req, field)
              if (!Validator.isDigits(keyValue)) {
                SystemLogger.log(`${field} is not a valid number`)
                return res.status(400).send(`${field} is not a valid number`)
              }
            }
          }
        }
        next()
      }
    };
  };

  static AuthToken = class {
    private static getToken = (req: express.Request): string => {
      const authHeader = req.headers.authorization
        ? req.headers.authorization
        : ''
      return authHeader.split(' ')[1]
    };

    private static isTokenValid = (req: express.Request): boolean => {
      try {
        jwt.verify(this.getToken(req), process.env.TOKEN_SECRET as string)
        return true
      } catch {
        return false
      }
    };

    private static getUserId = (req: express.Request): number => {
      const decoded = jwt.verify(
        this.getToken(req),
        process.env.TOKEN_SECRET as string
      )
      // i need to parse this decoded as any
      const id: number = <number>(<any>decoded).user.id
      return id
    };

    private static isUserAdmin = (req: express.Request): boolean => {
      const decoded = jwt.verify(
        this.getToken(req),
        process.env.TOKEN_SECRET as string
      )
      // i need to parse this decoded as any
      const is_admin: boolean = <boolean>(<any>decoded).user.is_admin
      return is_admin
    };

    private static getParamUserId = (req: express.Request): number => {
      if (isNaN(parseInt(req.params.user_id as string))) {
        return parseInt(req.params.id as string)
      } else {
        return parseInt(req.params.user_id as string)
      }
    };

    static verify = (matchUserID: boolean, requireAdmin: boolean) => {
      return (req: express.Request, res: express.Response, next: Function) => {
        if (this.isTokenValid(req)) {
          const jwtID: number = this.getUserId(req)
          new UserHandler().exists(jwtID).then((isUserExists) => {
            if (isUserExists) {
              if (matchUserID) {
                const paramID: number = this.getParamUserId(req)
                if (paramID !== jwtID) {
                  res
                    .status(401)
                    .json('[Access Denied], User id does not match!')
                  SystemLogger.log(
                    `[Access Denied], User id "${jwtID}" does not match with id "${paramID}" !`
                  )
                  return
                }
              }
              if (requireAdmin) {
                if (!this.isUserAdmin(req)) {
                  res.status(401).json('[Access Denied], User not found!')
                  SystemLogger.log('[Access Denied], User not found!')
                  return
                }
              }
              next()
            } else {
              res.status(401).json('[Access Denied], User not found!')
              SystemLogger.log('[Access Denied], User not found!')
            }
          })
        } else {
          res.status(401)
          res.json('Access denied, token not valid')
        }
        // try {
        //   const decoded = jwt.verify(this.getToken(req), process.env.TOKEN_SECRET as string)
        //   new UserHandler().exists(1).then((isUserExists) => {
        //     if (isUserExists) {

        //     } else {

        //     }
        //   })
        // } catch (err) {
        //   res.status(401)
        //   res.json(`Access denied, ${err}`)
        //   SystemLogger.log(err as string)
        // }
      }
    };
  };
}

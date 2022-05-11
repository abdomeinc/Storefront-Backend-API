import { execute } from '../database/manager'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import moment from 'moment'
import { IModel } from './interfaces/iModel'
import { OrderHandler } from './Order'
import { Validator } from '../utilities/validator'

dotenv.config()

export class User implements IModel {
  id!: number;
  first_name!: string;
  last_name!: string;
  full_name!: string;
  email!: string;
  password!: string;
  is_admin!: boolean;
  orders_count!: number;
  create_date!: string;
  last_login_date!: string;
}

export class UserHandler {
  selectCommand: string =
    "SELECT u.id, u.first_name, u.last_name, CONCAT(u.first_name, ' ' , u.last_name) as full_name, u.email, u.password, u.is_admin, (SELECT COUNT(*) FROM orders o WHERE o.user_id = u.id) as orders_count, u.create_date, u.last_login_date FROM users u";

  loadAllCommand: string = this.selectCommand + ' ORDER BY u.id ASC';

  loadAllByCommand: string =
    this.selectCommand + ' WHERE u.is_admin = ($1) ORDER BY u.id ASC';

  loadCommand: string =
    this.selectCommand + ' WHERE u.id = ($1) ORDER BY u.id ASC';

  loadByEmailCommand: string =
    this.selectCommand + ' WHERE u.email = ($1) ORDER BY u.id ASC';

  nameExistsCommand: string =
    this.selectCommand + ' WHERE u.first_name = ($1) AND u.last_name = ($2)';

  nameExistsWithIdCommand: string =
    this.selectCommand +
    ' WHERE u.first_name = ($1) AND u.last_name = ($2) AND u.id != ($3)';

  emailExistsCommand: string = this.selectCommand + ' WHERE u.email = ($1)';

  createCommand: string =
    'INSERT INTO users (first_name, last_name, email, password, is_admin, create_date) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';

  editCommand: string =
    'UPDATE users SET first_name = ($1), last_name = ($2) WHERE id = ($3) RETURNING *';

  deleteCommand: string = 'DELETE FROM users WHERE id=($1)';

  lastLoginDateCommand: string =
    'UPDATE users SET last_login_date = ($1) WHERE id = ($2)';

  async loadAll (): Promise<User[]> {
    return new Promise((resolve) => {
      execute(this.loadAllCommand).then((result) => {
        resolve(result.rows as User[])
      })
    })
  }

  async loadAllBy (is_admin: boolean): Promise<User[]> {
    return new Promise((resolve) => {
      execute(this.loadAllByCommand, [is_admin]).then((result) => {
        resolve(result.rows as User[])
      })
    })
  }

  async load (id: number): Promise<User> {
    return new Promise((resolve, reject) => {
      this.exists(id).then((exists) => {
        if (exists) {
          execute(this.loadCommand, [id]).then((result) => {
            resolve(result.rows[0] as User)
          })
        } else {
          reject(new Error(`user: ${id} is not exists.`))
        }
      })
    })
  }

  async loadByEmail (email: string): Promise<User> {
    return new Promise((resolve) => {
      execute(this.loadByEmailCommand, [email]).then((result) => {
        resolve(result.rows[0] as User)
      })
    })
  }

  async exists (id: number): Promise<boolean> {
    return new Promise((resolve) => {
      execute(this.loadCommand, [id]).then((result) => {
        resolve((result.rows.length > 0) as boolean)
      })
    })
  }

  async nameExists (first_name: string, last_name: string): Promise<boolean> {
    return new Promise((resolve) => {
      execute(this.nameExistsCommand, [first_name, last_name]).then(
        (result) => {
          resolve((result.rows.length > 0) as boolean)
        }
      )
    })
  }

  async nameExistsWithId (
    first_name: string,
    last_name: string,
    id: number
  ): Promise<boolean> {
    return new Promise((resolve) => {
      execute(this.nameExistsWithIdCommand, [first_name, last_name, id]).then(
        (result) => {
          resolve((result.rows.length > 0) as boolean)
        }
      )
    })
  }

  async emailExists (email: string): Promise<boolean> {
    return new Promise((resolve) => {
      execute(this.emailExistsCommand, [email]).then((result) => {
        resolve((result.rows.length > 0) as boolean)
      })
    })
  }

  async create (u: User): Promise<User> {
    const create_date: string = moment(new Date()).format('YYYY-MM-DD')
    return new Promise((resolve, reject) => {
      if (u.first_name.length > 25) {
        reject(
          new Error(`first_name: ${u.first_name} longer-than 25 letters.`)
        )
        return
      }
      if (u.last_name.length > 25) {
        reject(new Error(`last_name: ${u.last_name} longer-than 25 letters.`))
        return
      }
      if (!Validator.isEmail(u.email)) {
        reject(new Error(`email: ${u.email} is not a valid email.`))
        return
      }
      if (u.email.length > 100) {
        reject(new Error(`email: ${u.email} longer-than 100 letters.`))
        return
      }
      if (u.password.length > 25) {
        reject(new Error(`password: ${u.password} longer-than 25 letters.`))
        return
      }
      this.nameExists(u.first_name, u.last_name).then((nameExists) => {
        if (!nameExists) {
          this.emailExists(u.email).then((emailExists) => {
            if (!emailExists) {
              const passwordHash = bcrypt.hashSync(
                u.password + dotenv.parse('BCRYPT_PASSWORD'),
                parseInt(dotenv.parse('SALT_ROUNDS') as unknown as string)
              )
              execute(this.createCommand, [
                u.first_name,
                u.last_name,
                u.email,
                passwordHash,
                u.is_admin,
                create_date
              ]).then((result) => {
                resolve(result.rows[0] as User)
              })
            } else {
              reject(
                new Error(
                  `email ${u.email} is already exists, Please choose another email.`
                )
              )
            }
          })
        } else {
          reject(
            new Error(
              `user first name and last name ${
                u.first_name + ' ' + u.last_name
              } is already exists, Please choose another name.`
            )
          )
        }
      })
    })
  }

  async edit (id: number, first_name: string, last_name: string): Promise<User> {
    return new Promise((resolve, reject) => {
      if (first_name.length > 25) {
        reject(new Error(`first_name: ${first_name} longer-than 25 letters.`))
        return
      }
      if (last_name.length > 25) {
        reject(new Error(`last_name: ${last_name} longer-than 25 letters.`))
        return
      }
      this.exists(id).then((exists) => {
        if (exists) {
          this.nameExistsWithId(first_name, last_name, id).then(
            (nameExists) => {
              if (!nameExists) {
                execute(this.editCommand, [first_name, last_name, id]).then(
                  (result) => {
                    resolve(result.rows[0] as User)
                  }
                )
              } else {
                reject(
                  new Error(
                    `user first name and last name ${
                      first_name + ' ' + last_name
                    } is already exists, Please choose another name.`
                  )
                )
              }
            }
          )
        } else {
          reject(new Error(`user ${id} is not exists.`))
        }
      })
    })
  }

  async delete (id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.exists(id).then((exists) => {
        if (exists) {
          new OrderHandler().inOrder(id).then((inOrder) => {
            if (!inOrder) {
              execute(this.deleteCommand, [id]).then((result) => {
                resolve((result.rowCount > 0) as boolean)
              })
            } else {
              reject(
                new Error(
                  `user ${id} is already been used by 1 or more orders, You can only delete empty users.`
                )
              )
            }
          })
        } else {
          reject(new Error(`user ${id} is not exists.`))
        }
      })
    })
  }

  async authenticate (email: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      if (email.length > 100) {
        reject(new Error(`email: ${email} longer-than 100 letters.`))
        return
      }
      if (!Validator.isEmail(email)) {
        reject(new Error(`email: ${email} is not a valid email.`))
        return
      }
      if (password.length > 25) {
        reject(new Error(`password: ${password} longer-than 25 letters.`))
        return
      }
      this.emailExists(email).then((emailExists) => {
        if (emailExists) {
          this.loadByEmail(email)
            .then((user) => {
              const validCredentials = bcrypt.compareSync(
                (password +
                  dotenv.parse('BCRYPT_PASSWORD')) as unknown as string,
                user.password
              )
              if (validCredentials) {
                this.updateLogin(user.id).finally(() => {
                  resolve(user)
                })
              } else {
                reject(new Error('invalid user credentials.'))
              }
            })
            .catch((reason) => {
              reject(
                new Error(`Could not add authenticate user ${email}. ${reason}`)
              )
            })
        } else {
          reject(new Error('invalid user credentials.'))
        }
      })
    })
  }

  async updateLogin (id: number): Promise<void> {
    const last_login_date: string = moment(new Date()).format('YYYY-MM-DD')
    return new Promise((resolve, reject) => {
      this.exists(id).then((exists) => {
        if (exists) {
          execute(this.lastLoginDateCommand, [last_login_date, id]).then(() => {
            resolve()
          })
        } else {
          reject(new Error(`user ${id} is not exists.`))
        }
      })
    })
  }
}

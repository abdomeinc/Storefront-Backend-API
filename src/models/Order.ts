import { OrderStatus } from '../helpers/enums'
import { execute } from '../database/manager'
import moment from 'moment'
import { IModel } from './interfaces/iModel'
import { OrderProductsHandler } from './OrderProduct'
import { IHandler } from './interfaces/iHandler'

export class Order implements IModel {
  id!: number;
  user_id!: number;
  order_status!: OrderStatus | string;
  products_count!: number;
  create_date!: string;
  constructor (id_: number) {
    this.id = id_
    this.user_id = 0
    this.order_status = OrderStatus.NONE
    this.create_date = ''
  }
}

export class OrderHandler implements IHandler {
  selectCommand: string =
    'SELECT o.*, (SELECT COUNT(*) FROM order_products p WHERE p.order_id = o.id) products_count FROM orders o';

  loadAllCommand: string = this.selectCommand + ' ORDER BY o.id ASC';

  loadCommand: string = this.selectCommand + ' WHERE o.id = ($1)';

  loadAllByUserCommand: string = this.selectCommand + ' WHERE o.user_id = ($1)';

  loadByUserCommand: string =
    this.selectCommand + ' WHERE o.user_id = ($1) AND o.id = ($2)';

  createCommand: string =
    'INSERT INTO orders (user_id, order_status, create_date) VALUES($1, $2, $3) RETURNING *';

  editCommand: string =
    'UPDATE orders SET order_status = ($1) WHERE id = ($2) AND user_id = ($3) RETURNING *';

  deleteCommand: string = 'DELETE FROM orders WHERE id=($1) AND user_id = ($2)';

  async loadAll (): Promise<Order[]> {
    return new Promise((resolve) => {
      execute(this.loadAllCommand).then((result) => {
        resolve(result.rows as Order[])
      })
    })
  }

  async loadAllByUser (user_id: number): Promise<Order[]> {
    return new Promise((resolve) => {
      execute(this.loadAllByUserCommand, [user_id]).then((result) => {
        resolve(result.rows as Order[])
      })
    })
  }

  async load (id: number): Promise<Order> {
    return new Promise((resolve) => {
      execute(this.loadCommand, [id]).then((result) => {
        resolve(result.rows[0] as Order)
      })
    })
  }

  async loadByUser (user_id: number, id: number): Promise<Order> {
    return new Promise((resolve, reject) => {
      this.exists(user_id, id).then((exists) => {
        if (exists) {
          execute(this.loadByUserCommand, [user_id, id]).then((result) => {
            resolve(result.rows[0] as Order)
          })
        } else {
          reject(new Error(`product: ${id} is not exists.`))
        }
      })
    })
  }

  async exists (user_id: number, id: number): Promise<boolean> {
    return new Promise((resolve) => {
      execute(this.loadByUserCommand, [user_id, id]).then((result) => {
        resolve((result.rows.length > 0) as boolean)
      })
    })
  }

  async inOrder (user_id: number): Promise<boolean> {
    return new Promise((resolve) => {
      execute(this.loadAllByUserCommand, [user_id]).then((result) => {
        resolve((result.rows.length > 0) as boolean)
      })
    })
  }

  async nameExists (): Promise<boolean> {
    return Promise.resolve(false)
  }

  async nameExistsWithId (): Promise<boolean> {
    return Promise.resolve(false)
  }

  async create (user_id: number): Promise<Order> {
    const create_date: string = moment(new Date()).format('YYYY-MM-DD')
    return new Promise((resolve) => {
      execute(this.createCommand, [
        user_id,
        OrderStatus.ACTIVE,
        create_date
      ]).then((result) => {
        resolve(result.rows[0] as Order)
      })
    })
  }

  async edit (
    id: number,
    user_id: number,
    order_status: OrderStatus
  ): Promise<Order> {
    return new Promise((resolve, reject) => {
      this.exists(user_id, id).then((exists) => {
        if (exists) {
          execute(this.editCommand, [order_status, id, user_id]).then(
            (result) => {
              resolve(result.rows[0] as Order)
            }
          )
        } else {
          reject(new Error(`order ${id} is not exists.`))
        }
      })
    })
  }

  async deleteByUser (user_id: number, id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.exists(user_id, id).then((exists) => {
        if (exists) {
          new OrderProductsHandler().inOrder(id).then((inOrder) => {
            if (!inOrder) {
              execute(this.deleteCommand, [id, user_id]).then((result) => {
                resolve((result.rowCount > 0) as boolean)
              })
            } else {
              reject(
                new Error(
                  `order ${id} is already been used by 1 or more products, You can only delete empty orders.`
                )
              )
            }
          })
        } else {
          reject(new Error(`order ${id} is not exists.`))
        }
      })
    })
  }

  async delete (user_id: number, id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.exists(user_id, id).then((exists) => {
        if (exists) {
          new OrderProductsHandler().inOrder(id).then((inOrder) => {
            if (!inOrder) {
              execute(this.deleteCommand, [id, user_id]).then((result) => {
                resolve((result.rowCount > 0) as boolean)
              })
            } else {
              reject(
                new Error(
                  `order ${id} is already been used by 1 or more products, You can only delete empty orders.`
                )
              )
            }
          })
        } else {
          reject(new Error(`order ${id} is not exists.`))
        }
      })
    })
  }
}

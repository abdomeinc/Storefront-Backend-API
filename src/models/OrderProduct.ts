import moment from 'moment'
import { execute } from '../database/manager'
import { IHandler } from './interfaces/iHandler'
import { IModel } from './interfaces/iModel'
import { OrderHandler } from './Order'
import { ProductHandler } from './Product'
import { UserHandler } from './User'

export class OrderProduct implements IModel {
  id!: number;
  category_id!: number;
  category_name!: string;
  product_id!: number;
  product_name!: string;
  price!: number;
  quantity!: number;
  total_price!: number;
  order_id!: number;
  create_date!: string;
}
export class OrderProductsHandler implements IHandler {
  selectCommand: string =
    'SELECT op.id, p.category_id, c.name as category_name, op.product_id, p.name AS product_name, p.price, op.quantity, (p.price * op.quantity) as total_price, op.order_id, op.create_date FROM order_products op INNER JOIN products p ON p.id = OP.product_id INNER JOIN categories c ON c.id = p.category_id INNER JOIN orders o ON o.id = OP.order_id';

  loadAllCommand: string = this.selectCommand + ' ORDER BY op.id ASC';

  loadAllByOrderCommand: string =
    this.selectCommand + ' WHERE o.id = ($1) ORDER BY op.id ASC';

  loadAllByUserAndOrderCommand: string =
    this.selectCommand +
    ' WHERE o.user_id = ($1) AND o.id = ($2) ORDER BY op.id ASC';

  loadAllByUserCommand: string =
    this.selectCommand + ' WHERE o.user_id = ($1) ORDER BY op.id ASC';

  loadAllByProductCommand: string =
    this.selectCommand + ' WHERE op.product_id = ($1) ORDER BY op.id ASC';

  loadByOrderCommand: string =
    this.selectCommand +
    ' WHERE op.id = ($1) AND o.id = ($2) ORDER BY op.id ASC';

  loadByUserAndOrderCommand: string =
    this.selectCommand +
    ' WHERE o.user_id = ($1) AND o.id = ($2) AND op.id = ($3)  ORDER BY op.id ASC';

  createCommand: string =
    'INSERT INTO order_products (product_id, quantity, order_id, create_date) VALUES($1, $2, $3, $4) RETURNING *';

  editCommand: string =
    'UPDATE order_products SET product_id = ($1), quantity = ($2) WHERE id = ($3) AND order_id = ($4) RETURNING *';

  deleteCommand: string =
    'DELETE FROM order_products WHERE id=($1) AND order_id = ($2)';

  async loadAll (): Promise<OrderProduct[]> {
    return new Promise((resolve) => {
      execute(this.loadAllCommand).then((result) => {
        resolve(result.rows as OrderProduct[])
      })
    })
  }

  async load (
    user_id: number,
    order_id: number,
    id: number
  ): Promise<OrderProduct> {
    return new Promise((resolve, reject) => {
      new UserHandler().exists(user_id).then((userExists) => {
        if (userExists) {
          new OrderHandler().exists(user_id, order_id).then((orderExists) => {
            if (orderExists) {
              this.exists(id, order_id).then((exists) => {
                if (exists) {
                  execute(this.loadByUserAndOrderCommand, [
                    user_id,
                    order_id,
                    id
                  ]).then((result) => {
                    resolve(result.rows[0] as OrderProduct)
                  })
                } else {
                  reject(
                    new Error(
                      `order product: ${id} for order ${order_id} is not exists.`
                    )
                  )
                }
              })
            } else {
              reject(
                new Error(
                  `order: ${order_id} for user ${user_id} is not exists.`
                )
              )
            }
          })
        } else {
          reject(new Error(`user ${user_id} is not exists.`))
        }
      })
    })
  }

  async loadAllByOrder (
    user_id: number,
    order_id: number
  ): Promise<OrderProduct[]> {
    return new Promise((resolve, reject) => {
      new UserHandler().exists(user_id).then((userExists) => {
        if (userExists) {
          new OrderHandler().exists(user_id, order_id).then((orderExists) => {
            if (orderExists) {
              execute(this.loadAllByUserAndOrderCommand, [
                user_id,
                order_id
              ]).then((result) => {
                resolve(result.rows as OrderProduct[])
              })
            } else {
              reject(new Error(`order ${order_id} is not exists.`))
            }
          })
        } else {
          reject(new Error(`user ${user_id} is not exists.`))
        }
      })
    })
  }

  async exists (id: number, order_id: number): Promise<boolean> {
    return new Promise((resolve) => {
      execute(this.loadByOrderCommand, [id, order_id]).then((result) => {
        resolve((result.rows.length > 0) as boolean)
      })
    })
  }

  async nameExists (): Promise<boolean> {
    return Promise.resolve(false)
  }

  async inOrder (order_id: number): Promise<boolean> {
    return new Promise((resolve) => {
      execute(this.loadAllByOrderCommand, [order_id]).then((result) => {
        resolve((result.rows.length > 0) as boolean)
      })
    })
  }

  async usingProduct (product_id: number): Promise<boolean> {
    return new Promise((resolve) => {
      execute(this.loadAllByProductCommand, [product_id]).then((result) => {
        resolve((result.rows.length > 0) as boolean)
      })
    })
  }

  async nameExistsWithId (): Promise<boolean> {
    return Promise.resolve(false)
  }

  async create (
    user_id: number,
    order_product: OrderProduct
  ): Promise<OrderProduct> {
    const create_date: string = moment(new Date()).format('YYYY-MM-DD')
    return new Promise((resolve, reject) => {
      new UserHandler().exists(user_id).then((userExists) => {
        if (userExists) {
          new OrderHandler()
            .exists(user_id, order_product.order_id)
            .then((orderExists) => {
              if (orderExists) {
                new OrderHandler()
                  .loadByUser(user_id, order_product.order_id)
                  .then((order) => {
                    if (
                      order.order_status === 2 ||
                      order.order_status === 'COMPLETE'
                    ) {
                      reject(
                        new Error(
                          `Could not add product ${order_product.product_id} to order ${order_product.order_id} because order status is ${order.order_status}.`
                        )
                      )
                    } else {
                      new ProductHandler()
                        .productIdExists(order_product.product_id)
                        .then((productExists) => {
                          if (productExists) {
                            execute(this.createCommand, [
                              order_product.product_id,
                              order_product.quantity,
                              order_product.order_id,
                              create_date
                            ]).then((result) => {
                              resolve(result.rows[0] as OrderProduct)
                            })
                          } else {
                            reject(
                              new Error(
                                `poroduct ${order_product.product_id} is not exists.`
                              )
                            )
                          }
                        })
                    }
                  })
              } else {
                reject(
                  new Error(
                    `order ${order_product.order_id} for user ${user_id} is not exists.`
                  )
                )
              }
            })
        } else {
          reject(new Error(`user ${user_id} is not exists.`))
        }
      })
    })
  }

  async edit (
    user_id: number,
    order_product: OrderProduct
  ): Promise<OrderProduct> {
    return new Promise((resolve, reject) => {
      this.exists(order_product.id, order_product.order_id).then((exists) => {
        if (exists) {
          new UserHandler().exists(user_id).then((userExists) => {
            if (userExists) {
              new OrderHandler()
                .exists(user_id, order_product.order_id)
                .then((orderExists) => {
                  if (orderExists) {
                    new OrderHandler()
                      .loadByUser(user_id, order_product.order_id)
                      .then((order) => {
                        if (
                          order.order_status === 2 ||
                          order.order_status === 'COMPLETE'
                        ) {
                          reject(
                            new Error(
                              `Could not edit product ${order_product.product_id} in order ${order_product.order_id} because order status is ${order.order_status}.`
                            )
                          )
                        } else {
                          new ProductHandler()
                            .productIdExists(order_product.product_id)
                            .then((productExists) => {
                              if (productExists) {
                                execute(this.editCommand, [
                                  order_product.product_id,
                                  order_product.quantity,
                                  order_product.id,
                                  order_product.order_id
                                ]).then((result) => {
                                  resolve(result.rows[0] as OrderProduct)
                                })
                              } else {
                                reject(
                                  new Error(
                                    `poroduct ${order_product.product_id} is not exists.`
                                  )
                                )
                              }
                            })
                        }
                      })
                  } else {
                    reject(
                      new Error(
                        `order ${order_product.order_id} is not exists.`
                      )
                    )
                  }
                })
            } else {
              reject(new Error(`user ${user_id} is not exists.`))
            }
          })
        } else {
          reject(new Error(`order product ${order_product.id} is not exists.`))
        }
      })
    })
  }

  async delete (
    user_id: number,
    order_id: number,
    id: number
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.exists(id, order_id).then((exists) => {
        if (exists) {
          new UserHandler().exists(user_id).then((userExists) => {
            if (userExists) {
              new OrderHandler()
                .exists(user_id, order_id)
                .then((orderExists) => {
                  if (orderExists) {
                    new OrderHandler()
                      .loadByUser(user_id, order_id)
                      .then((order) => {
                        if (
                          order.order_status === 2 ||
                          order.order_status === 'COMPLETE'
                        ) {
                          reject(
                            new Error(
                              `Could not delete product ${id} from order ${order_id} because order status is ${order.order_status}.`
                            )
                          )
                        } else {
                          execute(this.deleteCommand, [id, order_id]).then(
                            (result) => {
                              resolve((result.rowCount > 0) as boolean)
                            }
                          )
                        }
                      })
                  } else {
                    reject(new Error(`order ${order_id} is not exists.`))
                  }
                })
            } else {
              reject(new Error(`user ${user_id} is not exists.`))
            }
          })
        } else {
          reject(new Error(`order product ${id} is not exists.`))
        }
      })
    })
  }
}

import moment from 'moment'
import { execute } from '../database/manager'
import { CategoryHandler } from './Category'
import { IHandler } from './interfaces/iHandler'
import { IModel } from './interfaces/iModel'
import { OrderProductsHandler } from './OrderProduct'

export class Product implements IModel {
  id!: number;
  name!: string;
  price!: number;
  category_id!: number;
  create_date!: string;

  constructor (id_: number) {
    this.id = id_
    this.name = ''
    this.price = 0
    this.category_id = 0
    this.create_date = ''
  }
}

export class ProductHandler implements IHandler {
  selectCommand: string =
    'SELECT p.id, p.name, p.price, p.category_id, c.name as category_name, p.create_date FROM products p INNER JOIN categories c ON c.id = p.category_id';

  loadAllCommand: string = this.selectCommand + ' ORDER BY p.id ASC';

  loadCommand: string = this.selectCommand + ' WHERE p.id = ($1)';

  loadCategoryCommand: string =
    this.selectCommand + ' WHERE c.id = ($1) ORDER BY p.id ASC';

  loadByCategoryAndIdCommand: string =
    this.selectCommand + ' WHERE c.id = ($1) AND p.id = ($2) ORDER BY p.id ASC';

  nameExistsCommand: string = this.selectCommand + ' WHERE p.name = ($1)';

  nameExistsWithIdCommand: string =
    this.selectCommand + ' WHERE p.name = ($1) AND p.id != ($2)';

  createCommand: string =
    'INSERT INTO products (name, price, category_id, create_date) VALUES($1, $2, $3, $4) RETURNING *';

  editCommand: string =
    'UPDATE products SET name = ($1), price = ($2) WHERE id = ($3) RETURNING *';

  deleteCommand: string = 'DELETE FROM products WHERE id = ($1)';

  async loadAll (category_id: number): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      new CategoryHandler().exists(category_id).then((categoryExists) => {
        if (categoryExists) {
          execute(this.loadCategoryCommand, [category_id]).then((result) => {
            resolve(result.rows as Product[])
          })
        } else {
          reject(new Error(`category ${category_id} is not exists.`))
        }
      })
    })
  }

  async load (category_id: number, id: number): Promise<Product> {
    return new Promise((resolve, reject) => {
      new CategoryHandler().exists(category_id).then((categoryExists) => {
        if (categoryExists) {
          this.exists(category_id, id).then((exists) => {
            if (exists) {
              execute(this.loadCommand, [id]).then((result) => {
                resolve(result.rows[0] as Product)
              })
            } else {
              reject(new Error(`product: ${id} is not exists.`))
            }
          })
        } else {
          reject(new Error(`category ${category_id} is not exists.`))
        }
      })
    })
  }

  async exists (category_id: number, id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      new CategoryHandler().exists(category_id).then((categoryExists) => {
        if (categoryExists) {
          execute(this.loadByCategoryAndIdCommand, [category_id, id]).then(
            (result) => {
              resolve((result.rows.length > 0) as boolean)
            }
          )
        } else {
          reject(new Error(`category ${category_id} is not exists.`))
        }
      })
    })
  }

  async productIdExists (id: number): Promise<boolean> {
    return new Promise((resolve) => {
      execute(this.loadCommand, [id]).then((result) => {
        resolve((result.rows.length > 0) as boolean)
      })
    })
  }

  async nameExists (name: string): Promise<boolean> {
    return new Promise((resolve) => {
      execute(this.nameExistsCommand, [name]).then((result) => {
        resolve((result.rows.length > 0) as boolean)
      })
    })
  }

  async nameExistsWithId (name: string, id: number): Promise<boolean> {
    return new Promise((resolve) => {
      execute(this.nameExistsWithIdCommand, [name, id]).then((result) => {
        resolve((result.rows.length > 0) as boolean)
      })
    })
  }

  async inCategory (category_id: number): Promise<boolean> {
    return new Promise((resolve) => {
      execute(this.loadCategoryCommand, [category_id]).then((result) => {
        resolve((result.rows.length > 0) as boolean)
      })
    })
  }

  async create (product: Product): Promise<Product> {
    const create_date: string = moment(new Date()).format('YYYY-MM-DD')
    return new Promise((resolve, reject) => {
      new CategoryHandler()
        .exists(product.category_id)
        .then((categoryExists) => {
          if (categoryExists) {
            if (product.name.length > 50) {
              reject(
                new Error(`name: ${product.name} longer-than 50 letters.`)
              )
            } else {
              this.nameExists(product.name).then((nameExists) => {
                if (!nameExists) {
                  execute(this.createCommand, [
                    product.name,
                    product.price,
                    product.category_id,
                    create_date
                  ]).then((result) => {
                    resolve(result.rows[0] as Product)
                  })
                } else {
                  reject(
                    new Error(
                      `product "${product.name}" is already exists, Please choose another one.`
                    )
                  )
                }
              })
            }
          } else {
            reject(new Error(`category ${product.category_id} is not exists.`))
          }
        })
    })
  }

  async edit (product: Product): Promise<Product> {
    return new Promise((resolve, reject) => {
      this.exists(product.category_id, product.id).then((exists) => {
        if (exists) {
          if (product.name.length > 50) {
            reject(new Error(`name: ${product.name} longer-than 50 letters.`))
          } else {
            this.nameExistsWithId(product.name, product.id).then(
              (nameExists) => {
                if (!nameExists) {
                  execute(this.editCommand, [
                    product.name,
                    product.price,
                    product.id
                  ]).then((result) => {
                    resolve(result.rows[0] as Product)
                  })
                } else {
                  reject(
                    new Error(
                      `product name ${product.name} is already exists, Please choose another one.`
                    )
                  )
                }
              }
            )
          }
        } else {
          reject(new Error(`product ${product.id} is not exists.`))
        }
      })
    })
  }

  async delete (category_id: number, id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      new CategoryHandler().exists(category_id).then((categoryExists) => {
        if (categoryExists) {
          this.exists(category_id, id).then((exists) => {
            if (exists) {
              new OrderProductsHandler().usingProduct(id).then((isUsed) => {
                if (!isUsed) {
                  execute(this.deleteCommand, [id]).then((result) => {
                    resolve((result.rowCount > 0) as boolean)
                  })
                } else {
                  reject(
                    new Error(
                      `product ${id} is already been used by 1 or more order products, You can only delete empty products.`
                    )
                  )
                }
              })
            } else {
              reject(new Error(`product: ${id} is not exists.`))
            }
          })
        } else {
          reject(new Error(`category ${category_id} is not exists.`))
        }
      })
    })
  }
}

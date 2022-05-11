import moment from 'moment'
import { execute } from '../database/manager'
import { IHandler } from './interfaces/iHandler'
import { ProductHandler } from './Product'

export class Category {
  id!: number;
  name!: string;
  create_date!: string;
  products_count!: number;
}

export class CategoryHandler implements IHandler {
  selectCommand: string =
    'SELECT c.*, (SELECT COUNT(*) FROM products p WHERE p.category_id = c.id) products_count FROM categories c';

  loadAllCommand: string = this.selectCommand + ' ORDER BY c.id ASC';

  loadCommand: string = this.selectCommand + ' WHERE c.id = ($1)';

  nameExistsCommand: string = this.selectCommand + ' WHERE c.name = ($1)';

  nameExistsWithIdCommand: string =
    this.selectCommand + ' WHERE c.name = ($1) AND c.id != ($2)';

  createCommand: string =
    'INSERT INTO categories (name, create_date) VALUES($1, $2) RETURNING *';

  editCommand: string =
    'UPDATE categories SET name = ($1) WHERE id = ($2) RETURNING *';

  deleteCommand: string = 'DELETE FROM categories WHERE id=($1)';

  async loadAll (): Promise<Category[]> {
    return new Promise((resolve) => {
      execute(this.loadAllCommand).then((result) => {
        resolve(result.rows as Category[])
      })
    })
  }

  async load (id: number): Promise<Category> {
    return new Promise((resolve, reject) => {
      this.exists(id).then((exists) => {
        if (exists) {
          execute(this.loadCommand, [id]).then((result) => {
            resolve(result.rows[0] as Category)
          })
        } else {
          reject(new Error(`category: ${id} is not exists.`))
        }
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

  async create (name: string): Promise<Category> {
    const create_date: string = moment(new Date()).format('YYYY-MM-DD')
    return new Promise((resolve, reject) => {
      if (name.length > 50) {
        reject(new Error(`name: ${name} longer-than 50 letters.`))
        return
      }
      this.nameExists(name).then((nameExists) => {
        if (!nameExists) {
          execute(this.createCommand, [name, create_date]).then((result) => {
            resolve(result.rows[0] as Category)
          })
        } else {
          reject(
            new Error(
              `category ${name} is already exists, Please choose another one.`
            )
          )
        }
      })
    })
  }

  async edit (id: number, name: string): Promise<Category> {
    return new Promise((resolve, reject) => {
      if (name.length > 50) {
        reject(new Error(`name: ${name} longer-than 50 letters.`))
        return
      }
      this.exists(id).then((exists) => {
        if (exists) {
          this.nameExistsWithId(name, id).then((nameExists) => {
            if (!nameExists) {
              execute(this.editCommand, [name, id]).then((result) => {
                resolve(result.rows[0] as Category)
              })
            } else {
              reject(
                new Error(
                  `category ${name} is already exists, Please choose another one.`
                )
              )
            }
          })
        } else {
          reject(new Error(`category ${id} is not exists.`))
        }
      })
    })
  }

  async delete (id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.exists(id).then((exists) => {
        if (exists) {
          new ProductHandler().inCategory(id).then((inCategory) => {
            if (!inCategory) {
              execute(this.deleteCommand, [id]).then((result) => {
                resolve((result.rowCount > 0) as boolean)
              })
            } else {
              reject(
                new Error(
                  `category ${id} is already been used by 1 or more products, You can only delete empty categories.`
                )
              )
            }
          })
        } else {
          reject(new Error(`category ${id} is not exists.`))
        }
      })
    })
  }
}

import client from '../database/manager'

export class DashboardService {
  // Get all prodcuts that have been included in orders
  async productsInOrders (): Promise<{
    name: string;
    price: number;
    order_id: number;
  }> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql =
        'SELECT name, price, order_id FROM products INNER JOIN order_products ON products.id = order_products.product_id'

      const result = await conn.query(sql)

      conn.release()

      return result.rows as unknown as {
        name: string;
        price: number;
        order_id: number;
      }
    } catch (err) {
      throw new Error(`unable get products in orders: ${err}`)
    }
  }

  // Get all users that have been made orders
  async usersWithOrders (): Promise<{ firstName: string; lastName: string }> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql =
        'SELECT first_name, last_name FROM users INNER JOIN orders ON users.id = orders.user_id'

      const result = await conn.query(sql)

      conn.release()

      return result.rows as unknown as { firstName: string; lastName: string }
    } catch (err) {
      throw new Error(`unable get users with orders: ${err}`)
    }
  }

  // Get all users that have made orders
  async fiveMostExpensive (): Promise<{ name: string; price: number }[]> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql =
        'SELECT name, price FROM products ORDER BY price DESC LIMIT 5'

      const result = await conn.query(sql)

      conn.release()

      return result.rows as unknown as { name: string; price: number }[]
    } catch (err) {
      throw new Error(`unable get products by price: ${err}`)
    }
  }
}

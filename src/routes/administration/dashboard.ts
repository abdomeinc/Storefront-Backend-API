// import the modules that will be use in here
import express from 'express'
import { DashboardService } from '../../services/dashboard'

export class Dashboard {
  static dashboardService = new DashboardService();

  static productsInOrders = async (
    _req: express.Request,
    res: express.Response
  ) => {
    const products = await this.dashboardService.productsInOrders()
    res.json(products)
  };

  static usersWithOrders = async (
    _req: express.Request,
    res: express.Response
  ) => {
    const users = await this.dashboardService.usersWithOrders()
    res.json(users)
  };

  static fiveMostExpensive = async (
    _req: express.Request,
    res: express.Response
  ) => {
    const users = await this.dashboardService.fiveMostExpensive()
    res.json(users)
  };

  static initialize = async (app: express.Application) => {
    app.get(
      '/api/administration/eshop/dashboard/orders/products',
      this.productsInOrders
    )
    app.get(
      '/api/administration/eshop/dashboard/orders/users',
      this.usersWithOrders
    )
    app.get(
      '/api/administration/eshop/dashboard/products/top5',
      this.fiveMostExpensive
    )
  };
}

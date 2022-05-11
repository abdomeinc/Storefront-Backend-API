import { OrderStatus } from '../../helpers/enums'
import { OrderProduct } from '../OrderProduct'
import { Product } from '../Product'
import { User } from '../User'
import { IModel } from './iModel'

export interface IHandler {
  loadAll(...args: [p1: number]): Promise<IModel[]>;
  load(
    ...args:
      | [p1: number]
      | [p1: number, p2: number]
      | [p1: number, p2: number, p3: number]
  ): Promise<IModel>;
  exists(...args: [p1: number] | [p1: number, p2: number]): Promise<boolean>;
  nameExists(p1: string): Promise<boolean>;
  nameExistsWithId(p1: string, p2: number): Promise<boolean>;
  create(
    ...args:
      | [p1: string]
      | [p1: number]
      | [p1: number, p2: OrderProduct]
      | [p1: Product]
      | [p1: User]
  ): Promise<IModel>;
  edit(
    ...args:
      | [p1: number, p2: string]
      | [p1: number, p2: number, p3: OrderStatus]
      | [p1: number, p2: OrderProduct]
      | [p1: Product]
      | [p1: number, p2: string, p3: string]
  ): Promise<IModel>;
  delete(
    ...args:
      | [p1: number]
      | [p1: number, p2: number]
      | [p1: number, p2: number, p3: number]
  ): Promise<boolean>;
}

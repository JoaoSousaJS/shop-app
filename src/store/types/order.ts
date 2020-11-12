import { Order } from '../../models/orders';

export interface IOrderState {
  orders: {
    orders: Order[];
  };
}

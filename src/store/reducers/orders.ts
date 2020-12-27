import { Order } from '../../models/orders';
import { ADD_ORDER, SET_ORDERS } from '../actions/orders';

const initialState = {
  orders: [],
};

interface IAction {
  type: string;
  orders: [];
  orderDate: {
    items: {};
    amount: number;
    id: string;
    date: Date;
  };
}

export const ordersReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        orders: action.orders,
      };
    case ADD_ORDER:
      const newOrder = new Order(
        action.orderDate.id,
        action.orderDate.items,
        action.orderDate.amount,
        action.orderDate.date,
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
  }
  return state;
};

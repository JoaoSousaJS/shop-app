import { Order } from '../../models/orders';
import { ADD_ORDER } from '../actions/orders';

const initialState = {
  orders: [],
};

interface IAction {
  type: string;
  orderDate: {
    items: {};
    amount: number;
  };
}

export const ordersReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        new Date().toString(),
        action.orderDate.items,
        action.orderDate.amount,
        new Date(),
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
  }
  return state;
};

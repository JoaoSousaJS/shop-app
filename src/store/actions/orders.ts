export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = (cartItems: Object, totalAmount: number) => {
  return {
    type: ADD_ORDER,
    orderDate: { items: cartItems, amount: totalAmount },
  };
};

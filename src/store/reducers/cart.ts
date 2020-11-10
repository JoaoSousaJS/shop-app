import { CartItem } from '../../models/card-item';
import { Product } from '../../models/products';
import { ADD_TO_CART } from '../actions/cart';

const initialState = {
  items: {},
  totalAmount: 0,
};

interface IAction {
  type: string;
  product: Product;
}

export const cartReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodtTitle = addedProduct.title;

      let updateOrNewCartItem;

      if (state.items[addedProduct.id]) {
        // already have the item in the cart
        updateOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodtTitle,
          state.items[addedProduct.id].sum + prodPrice,
        );
      } else {
        updateOrNewCartItem = new CartItem(1, prodPrice, prodtTitle, prodPrice);
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updateOrNewCartItem },
        totalAmount: state.totalAmount + prodPrice,
      };
  }
  return state;
};

import PRODUCTS from '../../data/dummy-data';
import { DELETE_PRODUCT } from '../actions/products';

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === 'u1'),
};

interface IAction {
  type: string;
  pid: string;
}

export const productReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.pid,
        ),
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.pid,
        ),
      };
  }

  return state;
};

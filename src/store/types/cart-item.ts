import { CartItem } from '../../models/card-item';

export interface ICartState {
  cart: {
    items: CartItem;
    totalAmount: number;
  };
}

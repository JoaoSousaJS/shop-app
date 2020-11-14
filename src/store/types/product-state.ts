import { Product } from '../../models/products';

export interface IStateProducts {
  products: {
    userProducts: Product[];
    availableProducts: Product[];
  };
}

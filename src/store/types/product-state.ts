import { Product } from '../../models/products';

export interface IStateProducts {
  products: {
    availableProducts: Product[];
  };
}

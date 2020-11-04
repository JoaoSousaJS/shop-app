import React from 'react';
import { ProductList } from '../../components/shop/ProductList';
import { ProductDetailProps } from '../../navigation/types/ProductDetail/product-details-screen-types';

export const ProductsOverviewScreen = ({ navigation }: ProductDetailProps) => {
  return <ProductList navigation={navigation} />;
};

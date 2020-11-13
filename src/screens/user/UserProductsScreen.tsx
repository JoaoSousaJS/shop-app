import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { ProductItem } from '../../components/shop/ProductItem';
import { Product } from '../../models/products';

interface IState {
  products: {
    userProducts: Product[];
  };
}

export const UserProductsScreen = () => {
  const userProducts = useSelector(
    (state: IState) => state.products.userProducts,
  );
  return (
    <FlatList
      data={userProducts}
      renderItem={(itemData) => (
        <ProductItem
          imageUrl={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onAddToCart={() => {}}
          onViewDetail={() => {}}
        />
      )}
    />
  );
};

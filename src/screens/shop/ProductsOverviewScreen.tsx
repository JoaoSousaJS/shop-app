import React from 'react';
import { FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { IStateProducts } from '../../store/types/product-state';

export const ProductsOverviewScreen = () => {
  const products = useSelector(
    (state: IStateProducts) => state.products.availableProducts,
  );
  return (
    <FlatList
      data={products}
      renderItem={(itemData) => <Text>{itemData.item.title}</Text>}
    />
  );
};

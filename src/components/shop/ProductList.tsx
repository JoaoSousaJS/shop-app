import React from 'react';
import { FlatList, Text, View, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { IStateProducts } from '../../store/types/product-state';
import { ProductItem } from './ProductItem';

export const ProductList = () => {
  const products = useSelector(
    (state: IStateProducts) => state.products.availableProducts,
  );
  return (
    <FlatList
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          title={itemData.item.title}
          imageUrl={itemData.item.imageUrl}
          price={itemData.item.price}
          onViewDetail={() => {}}
          onAddToCart={() => {}}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({});

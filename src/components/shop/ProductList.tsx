import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { FlatList, Text, View, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { ProductDetailStackParamList } from '../../navigation/types/ProductDetail/RouteParamList';
import { IStateProducts } from '../../store/types/product-state';
import { ProductItem } from './ProductItem';

interface IProps {
  navigation: StackNavigationProp<
    ProductDetailStackParamList,
    'productsDetails'
  >;
}

export const ProductList = (props: IProps) => {
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
          onViewDetail={() =>
            props.navigation.navigate('productsDetails', {
              productId: itemData.item.id,
            })
          }
          onAddToCart={() => {}}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({});

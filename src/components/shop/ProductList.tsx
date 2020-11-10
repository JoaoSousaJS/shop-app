import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ProductDetailStackParamList } from '../../navigation/types/ProductDetail/RouteParamList';
import { IStateProducts } from '../../store/types/product-state';
import { ProductItem } from './ProductItem';
import * as cartActions from '../../store/actions/cart';

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
  const dispatch = useDispatch();
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
              title: itemData.item.title,
            })
          }
          onAddToCart={() => {
            dispatch(cartActions.addToCart(itemData.item));
          }}
        />
      )}
    />
  );
};

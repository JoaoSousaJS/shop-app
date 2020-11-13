import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { FlatList, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ProductDetailStackParamList } from '../../navigation/types/ProductDetail/RouteParamList';
import { IStateProducts } from '../../store/types/product-state';
import { ProductItem } from './ProductItem';
import * as cartActions from '../../store/actions/cart';
import { AppColors } from '../../constants/Color';

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

  const selectHandler = (id: string, title: string) => {
    props.navigation.navigate('productsDetails', {
      productId: id,
      title: title,
    });
  };
  return (
    <FlatList
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          title={itemData.item.title}
          imageUrl={itemData.item.imageUrl}
          price={itemData.item.price}
          onSelect={() => selectHandler(itemData.item.id, itemData.item.title)}
        >
          <Button
            color={AppColors.primary}
            title="View Details"
            onPress={() => {
              selectHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={AppColors.primary}
            title="Add to Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

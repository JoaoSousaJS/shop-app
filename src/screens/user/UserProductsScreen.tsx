import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ProductItem } from '../../components/shop/ProductItem';
import { AppColors } from '../../constants/Color';
import { Product } from '../../models/products';
import * as productActions from '../../store/actions/products';

interface IState {
  products: {
    userProducts: Product[];
  };
}

export const UserProductsScreen = () => {
  const userProducts = useSelector(
    (state: IState) => state.products.userProducts,
  );
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const handleEditProduct = (id: string) => {
    navigation.navigate('edit', { productId: id });
  };
  return (
    <FlatList
      data={userProducts}
      renderItem={(itemData) => (
        <ProductItem
          imageUrl={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => handleEditProduct(itemData.item.id)}
        >
          <Button
            color={AppColors.primary}
            title="Edit"
            onPress={() => handleEditProduct(itemData.item.id)}
          />
          <Button
            color={AppColors.primary}
            title="Delete"
            onPress={() => {
              dispatch(productActions.deleteProduct(itemData.item.id));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

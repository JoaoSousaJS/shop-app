import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  FlatList,
  Button,
  ActivityIndicator,
  StyleSheet,
  Text,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ProductDetailStackParamList } from '../../navigation/types/ProductDetail/RouteParamList';
import { IStateProducts } from '../../store/types/product-state';
import { ProductItem } from './ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/products';
import { AppColors } from '../../constants/Color';
interface IProps {
  navigation: StackNavigationProp<
    ProductDetailStackParamList,
    'productsDetails'
  >;
}

export const ProductList = (props: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const products = useSelector(
    (state: IStateProducts) => state.products.availableProducts,
  );
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setError('');
    setIsLoading(true);
    try {
      await dispatch(productActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    loadProducts();
  }, [dispatch, loadProducts]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener('focus', loadProducts);

    return willFocusSub;
  }, [loadProducts, props.navigation]);

  const selectHandler = (id: string, title: string) => {
    props.navigation.navigate('productsDetails', {
      productId: id,
      title: title,
    });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error ocurred!</Text>
        <Button
          title="Try again"
          onPress={loadProducts}
          color={AppColors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={AppColors.primary} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found.</Text>
      </View>
    );
  }
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

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

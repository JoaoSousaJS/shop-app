import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Button,
} from 'react-native';

import { useSelector } from 'react-redux';
import { AppColors } from '../../constants/Color';
import { ProductDetailProps } from '../../navigation/types/ProductDetail/product-details-screen-types';
import { IStateProducts } from '../../store/types/product-state';

// import { Container } from './styles';

export const ProductDetailScreen = ({ route }: ProductDetailProps) => {
  const { productId } = route.params;
  const selectedProduct = useSelector((state: IStateProducts) =>
    state.products.availableProducts.find((prod) => prod.id === productId),
  );
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct?.imageUrl }} />
      <View style={styles.actions}>
        <Button
          color={AppColors.primary}
          title="Add to Card"
          onPress={() => {}}
        />
      </View>

      <Text style={styles.price}>${selectedProduct?.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct?.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center',
  },
});

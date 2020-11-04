import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Button,
} from 'react-native';
import { ProductDetailProps } from '../../navigation/types/ProductDetail/product-details-screen-types';

// import { Container } from './styles';

export const ProductDetailScreen = ({ route }: ProductDetailProps) => {
  const { productId } = route.params;
  return (
    <View>
      <Text>The Product Detail Screen</Text>
      <Text>{productId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

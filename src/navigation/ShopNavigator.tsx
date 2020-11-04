import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ProductDetailScreen } from '../screens/shop/ProductDetailScreen';
import { ProductsOverviewScreen } from '../screens/shop/ProductsOverviewScreen';
import { defaultNavigationOptions } from './ScreenOptions/screen-options';
import { ProductOverviewStackParamList } from './types/ProductOverview/RouteParamList';

const Stack = createStackNavigator<ProductOverviewStackParamList>();

export const ShopStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavigationOptions}>
      <Stack.Screen
        name="productsOverview"
        component={ProductsOverviewScreen}
        options={{ title: 'All Products' }}
      />
      <Stack.Screen name="productsDetails" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
};

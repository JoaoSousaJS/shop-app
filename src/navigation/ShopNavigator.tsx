import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ProductsOverviewScreen } from '../screens/shop/ProductsOverviewScreen';
import { defaultNavigationOptions } from './ScreenOptions/screen-options';
import { ProductOverviewStackParamList } from './types/RouteParamList';

const Stack = createStackNavigator<ProductOverviewStackParamList>();

export const ShopStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavigationOptions}>
      <Stack.Screen
        name="productsOverview"
        component={ProductsOverviewScreen}
      />
    </Stack.Navigator>
  );
};

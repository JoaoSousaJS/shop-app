import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { ProductDetailScreen } from '../screens/shop/ProductDetailScreen';
import { ProductsOverviewScreen } from '../screens/shop/ProductsOverviewScreen';
import { defaultNavigationOptions } from './ScreenOptions/screen-options';
import { ProductOverviewStackParamList } from './types/ProductOverview/RouteParamList';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CustomHeaderButton } from '../components/UI/HeaderButton';

const Stack = createStackNavigator<ProductOverviewStackParamList>();

export const ShopStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavigationOptions}>
      <Stack.Screen
        name="productsOverview"
        component={ProductsOverviewScreen}
        options={{
          title: 'All Products',
          headerRight: () => (
            <TouchableOpacity>
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Cart"
                  iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                  onPress={() => {}}
                />
              </HeaderButtons>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="productsDetails"
        component={ProductDetailScreen}
        options={({ route }) => ({
          headerTitle: route.params.title,
        })}
      />
    </Stack.Navigator>
  );
};

import React from 'react';

import { Platform, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ProductDetailScreen } from '../screens/shop/ProductDetailScreen';
import { ProductsOverviewScreen } from '../screens/shop/ProductsOverviewScreen';
import { defaultNavigationOptions } from './ScreenOptions/screen-options';
import { ProductOverviewStackParamList } from './types/ProductOverview/RouteParamList';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CustomHeaderButton } from '../components/UI/HeaderButton';
import { CartScreen } from '../screens/shop/CartScreen';
import { OrdersScreen } from '../screens/shop/OrdersScreen';
import { OrderStackParamList } from './types/orders/RouteParamList';
import { AppColors } from '../constants/Color';
import { DrawerActions } from '@react-navigation/native';

const Stack = createStackNavigator<ProductOverviewStackParamList>();
const OrderStack = createStackNavigator<OrderStackParamList>();
const ShopNavigator = createDrawerNavigator();

export const ShopStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavigationOptions}>
      <Stack.Screen
        name="productsOverview"
        component={ProductsOverviewScreen}
        options={({ navigation }) => ({
          title: 'All Products',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            >
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Menu"
                  iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                />
              </HeaderButtons>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('cart')}>
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Cart"
                  iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                />
              </HeaderButtons>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="productsDetails"
        component={ProductDetailScreen}
        options={({ navigation, route }) => ({
          headerTitle: route.params.title,
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('cart')}>
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Cart"
                  iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                />
              </HeaderButtons>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen name="cart" component={CartScreen} />
    </Stack.Navigator>
  );
};

export const OrdersNavigator = () => {
  return (
    <OrderStack.Navigator screenOptions={defaultNavigationOptions}>
      <OrderStack.Screen
        name="orders"
        component={OrdersScreen}
        options={({ navigation }) => ({
          headerTitle: 'Your Orders',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            >
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Menu"
                  iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                />
              </HeaderButtons>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('cart')}>
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Cart"
                  iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                />
              </HeaderButtons>
            </TouchableOpacity>
          ),
        })}
      />
    </OrderStack.Navigator>
  );
};

export const ShopDrawerNavigator = () => {
  return (
    <ShopNavigator.Navigator
      drawerContentOptions={{ activeTintColor: AppColors.primary }}
      screenOptions={{ headerShown: false }}
    >
      <ShopNavigator.Screen name="home" component={ShopStackNavigator} />
      <ShopNavigator.Screen name="orders" component={OrdersNavigator} />
    </ShopNavigator.Navigator>
  );
};

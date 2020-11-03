import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { productReducer } from './src/store/reducers/products';
import { ShopStackNavigator } from './src/navigation/ShopNavigator';

const rootReducers = combineReducers({
  products: productReducer,
});

const store = createStore(rootReducers);

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <ShopStackNavigator />
      </Provider>
    </NavigationContainer>
  );
}

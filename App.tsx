import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { productReducer } from './src/store/reducers/products';
import { cartReducer } from './src/store/reducers/cart';
import { ShopStackNavigator } from './src/navigation/ShopNavigator';

const rootReducers = combineReducers({
  products: productReducer,
  cart: cartReducer,
});

const store = createStore(rootReducers);

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./src/assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./src/assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }
  return (
    <NavigationContainer>
      <Provider store={store}>
        <ShopStackNavigator />
      </Provider>
    </NavigationContainer>
  );
}

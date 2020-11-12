import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CartItem } from '../../components/shop/CartItem';
import { AppColors } from '../../constants/Color';
import { ICartState } from '../../store/types/cart-item';
import * as cartAction from '../../store/actions/cart';
import * as orderAction from '../../store/actions/orders';

export const CartScreen = () => {
  const cartTotalAmonut = useSelector(
    (state: ICartState) => state.cart.totalAmount,
  );
  const cartItems = useSelector((state: ICartState) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }

    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1,
    );
  });

  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>${cartTotalAmonut.toFixed(2)}</Text>
        </Text>
        <Button
          color={AppColors.accent}
          title="Order Now"
          disabled={cartItems.length === 0}
          onPress={() => {
            dispatch(orderAction.addOrder(cartItems, cartTotalAmonut));
          }}
        />
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            onRemove={() => {
              dispatch(cartAction.removeFromCart(itemData.item.productId));
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
  },
  amount: {
    color: AppColors.primary,
  },
});

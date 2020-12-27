import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CartItem } from '../../components/shop/CartItem';
import { AppColors } from '../../constants/Color';
import { ICartState } from '../../store/types/cart-item';
import * as cartAction from '../../store/actions/cart';
import * as orderAction from '../../store/actions/orders';
import { Card } from '../../components/UI/Card';

export const CartScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
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

  const sendOrderHandler = async () => {
    setIsLoading(true);
    await dispatch(orderAction.addOrder(cartItems, cartTotalAmonut));
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="small" color={AppColors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>
            ${Math.round(Number(cartTotalAmonut.toFixed(2)) * 100) / 100}
          </Text>
        </Text>
        <Button
          color={AppColors.accent}
          title="Order Now"
          disabled={cartItems.length === 0}
          onPress={sendOrderHandler}
        />
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            deletable
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
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
  },
  amount: {
    color: AppColors.primary,
  },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

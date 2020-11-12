import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AppColors } from '../../constants/Color';
import { CartItem } from './CartItem';

interface IOrderItem {
  amount: number;
  date: string;
  items: [];
}

interface ICartItem {
  quantity: number;
  productTitle: string;
  sum: number;
}

export const OrderItem = (props: IOrderItem) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>{props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        title={showDetails ? 'Hide Details' : 'Show Details'}
        onPress={() => {
          setShowDetails((prevState) => !prevState);
        }}
        color={AppColors.primary}
      />
      {showDetails && (
        <View style={styles.detailItem}>
          {props.items.map((cartItem: ICartItem) => (
            <CartItem
              title={cartItem.productTitle}
              amount={cartItem.sum}
              quantity={cartItem.quantity}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 20,
    padding: 10,
    alignItems: 'center',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  totalAmount: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    fontFamily: 'open-sans',
    color: '#888',
  },
  detailItem: {
    width: '100%',
  },
});

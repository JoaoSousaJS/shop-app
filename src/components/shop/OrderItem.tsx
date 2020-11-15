import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AppColors } from '../../constants/Color';
import { Card } from '../UI/Card';
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
  productId: string;
}

export const OrderItem = (props: IOrderItem) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card style={styles.orderItem}>
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
              key={cartItem.productId}
              title={cartItem.productTitle}
              amount={cartItem.sum}
              quantity={cartItem.quantity}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
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

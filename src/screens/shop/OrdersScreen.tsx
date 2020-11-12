import React from 'react';
import { FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { IOrderState } from '../../store/types/order';

export const OrdersScreen = () => {
  const orders = useSelector((state: IOrderState) => state.orders.orders);

  return (
    <FlatList
      data={orders}
      renderItem={(itemData) => <Text>{itemData.item.totalAmount}</Text>}
    />
  );
};

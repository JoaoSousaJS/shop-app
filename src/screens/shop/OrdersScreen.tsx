import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { OrderItem } from '../../components/shop/OrderItem';
import { IOrderState } from '../../store/types/order';

export const OrdersScreen = () => {
  const orders = useSelector((state: IOrderState) => state.orders.orders);

  return (
    <FlatList
      data={orders}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

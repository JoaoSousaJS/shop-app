import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OrderStackParamList } from './RouteParamList';

type OrderScreenRouteProp = RouteProp<OrderStackParamList, 'orders'>;
type OrderScreenNavigationProp = StackNavigationProp<
  OrderStackParamList,
  'orders'
>;

export type OrderProps = {
  route: OrderScreenRouteProp;
  navigation: OrderScreenNavigationProp;
};

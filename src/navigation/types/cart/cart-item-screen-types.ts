import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CartStackParamList } from './RouteParamList';

type CartScreenRouteProp = RouteProp<CartStackParamList, 'cart'>;
type CartScreenNavigationProp = StackNavigationProp<CartStackParamList, 'cart'>;

export type CartProps = {
  route: CartScreenRouteProp;
  navigation: CartScreenNavigationProp;
};

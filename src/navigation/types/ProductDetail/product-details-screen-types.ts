import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProductDetailStackParamList } from './RouteParamList';

type ProductDetailcreenRouteProp = RouteProp<
  ProductDetailStackParamList,
  'productsDetails'
>;
export type ProductDetailScreenNavigationProp = StackNavigationProp<
  ProductDetailStackParamList,
  'productsDetails'
>;

export type ProductDetailProps = {
  route: ProductDetailcreenRouteProp;
  navigation: ProductDetailScreenNavigationProp;
};

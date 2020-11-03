import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProductOverviewStackParamList } from './RouteParamList';

type ProductOverviewcreenRouteProp = RouteProp<
  ProductOverviewStackParamList,
  'productsOverview'
>;
type ProductOverviewScreenNavigationProp = StackNavigationProp<
  ProductOverviewStackParamList,
  'productsOverview'
>;

export type ProductOverviewProps = {
  route: ProductOverviewcreenRouteProp;
  navigation: ProductOverviewScreenNavigationProp;
};

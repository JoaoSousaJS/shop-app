import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { UserStackParamList } from './RouteParamList';

type UserScreenRouteProp = RouteProp<UserStackParamList, 'user'>;
export type UserScreenNavigationProp = StackNavigationProp<
  UserStackParamList,
  'user'
>;

export type UserProps = {
  route: UserScreenRouteProp;
  navigation: UserScreenNavigationProp;
};

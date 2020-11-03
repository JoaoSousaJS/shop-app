import { AppColors } from '../../constants/Color';
import { Platform } from 'react-native';

export const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? AppColors.primary : 'white',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : AppColors.primary,
};

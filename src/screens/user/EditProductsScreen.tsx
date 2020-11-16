import React, { useCallback, useEffect, useReducer } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { IStateProducts } from '../../store/types/product-state';
import * as productAction from '../../store/actions/products';
import { Input } from '../../components/UI/input';

interface IAction {
  type: string;
  input: string;
  value: string;
  isValid: boolean;
}

interface IState {
  inputValues: Object;
  inputValidities: Object;
  formIsValid: Boolean;
}

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state: IState, action: IAction) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updateValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updateValues,
    };
  }

  return state;
};

export const EditProductsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const prodId = route.params.productId;
  const editedProduct = useSelector((state: IStateProducts) =>
    state.products.userProducts.find((prod) => prod.id === prodId),
  );

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      description: editedProduct ? editedProduct.description : '',
      price: '',
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form', [
        { text: 'Okay' },
      ]);
      return;
    }
    if (editedProduct) {
      dispatch(
        productAction.updateProduct(
          prodId,
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
        ),
      );
    } else {
      dispatch(
        productAction.createProduct(
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
          +formState.inputValues.price,
        ),
      );
    }
    navigation.goBack();
  }, [
    dispatch,
    editedProduct,
    formState.formIsValid,
    formState.inputValues.imageUrl,
    formState.inputValues.price,
    formState.inputValues.description,
    formState.inputValues.title,
    navigation,
    prodId,
  ]);

  useEffect(() => {
    navigation.setParams({ save: submitHandler });
  }, [submitHandler, navigation]);

  const inputChangeHandler = useCallback(
    (inputIdentifier: string, inputValue: string, inputValidity: boolean) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState],
  );

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          id="title"
          label="Title"
          errorText="Please enter a valid title"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.title : ''}
          initiallyValid={!!editedProduct}
          required
        />
        <Input
          id="imageUrl"
          label="Image Url"
          errorText="Please enter a valid image Url"
          keyboardType="default"
          returnKeyType="next"
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.imageUrl : ''}
          initiallyValid={!!editedProduct}
          required
        />
        {editedProduct ? null : (
          <Input
            id="price"
            label="Price"
            errorText="Please enter a valid price"
            keyboardType="decimal-pad"
            onInputChange={inputChangeHandler}
            returnKeyType="next"
            required
            min={0.1}
          />
        )}

        <Input
          id="description"
          label="Description"
          errorText="Please enter a valid description"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          multiline
          numberOfLines={3}
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.description : ''}
          initiallyValid={!!editedProduct}
          required
          minLength={5}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
});

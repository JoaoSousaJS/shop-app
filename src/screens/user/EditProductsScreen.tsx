import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { IStateProducts } from '../../store/types/product-state';
import * as productAction from '../../store/actions/products';

export const EditProductsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const prodId = route.params.productId;
  const editedProduct = useSelector((state: IStateProducts) =>
    state.products.userProducts.find((prod) => prod.id === prodId),
  );

  const [title, setTItle] = useState(editedProduct ? editedProduct.title : '');
  const [imageUrl, setTImageUrl] = useState(
    editedProduct ? editedProduct.imageUrl : '',
  );
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : '',
  );

  const submitHandler = useCallback(() => {
    if (editedProduct) {
      dispatch(
        productAction.updateProduct(prodId, title, description, imageUrl),
      );
      navigation.goBack();
    } else {
      dispatch(
        productAction.createProduct(title, description, imageUrl, +price),
      );
      navigation.goBack();
    }
    console.log('submit');
  }, [description, editedProduct, dispatch, imageUrl, price, prodId, title]);

  useEffect(() => {
    navigation.setParams({ save: submitHandler });
  }, [submitHandler, navigation]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => setTItle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image Url</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(text) => setTImageUrl(text)}
          />
        </View>
        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={(text) => setPrice(text)}
            />
          </View>
        )}

        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: '100%',
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});

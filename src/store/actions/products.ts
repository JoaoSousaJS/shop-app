import { Product } from '../../models/products';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async (dispatch: any) => {
    try {
      const response = await fetch(
        'https://rn-complete-guide-940e3-default-rtdb.firebaseio.com/products.json',
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            'u1',
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price,
          ),
        );
      }
      console.log(loadedProducts);
      dispatch({ type: SET_PRODUCTS, products: loadedProducts });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteProduct = (productId: string) => {
  return async (dispatch: any) => {
    const response = await fetch(
      `https://rn-complete-guide-940e3-default-rtdb.firebaseio.com/products/${productId}.json`,
      {
        method: 'DELETE',
      },
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};

export const createProduct = (
  title: string,
  description: string,
  imageUrl: string,
  price: number,
) => {
  return async (dispatch: any) => {
    const response = await fetch(
      'https://rn-complete-guide-940e3-default-rtdb.firebaseio.com/products.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
        }),
      },
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
      },
    });
  };
};

export const updateProduct = (
  id: string,
  title: string,
  description: string,
  imageUrl: string,
) => {
  return async (dispatch: any) => {
    try {
      const response = await fetch(
        `https://rn-complete-guide-940e3-default-rtdb.firebaseio.com/products/${id}.json`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            description,
            imageUrl,
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      dispatch({
        type: UPDATE_PRODUCT,
        pid: id,
        productData: {
          title,
          description,
          imageUrl,
        },
      });
    } catch (err) {
      throw err;
    }
  };
};

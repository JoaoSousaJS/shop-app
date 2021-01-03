export const SIGNUP = 'SIGNUP';

export const signup = (email: string, password: string) => {
  return async (dispatch: any) => {
    dispatch({ type: SIGNUP });
  };
};

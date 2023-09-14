import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User, userActions } from '@/entities/User';

interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<
  User, LoginByUsernameProps, ThunkConfig<string>
>(
  'login/loginByUsername',
  async (authData, { dispatch, rejectWithValue, extra: { api } }) => {
    try {
      const response = await api.post<User>('/login', authData);

      if (!response.data) {
        throw new Error();
      }

      dispatch(userActions.setAuthData(response.data));
      return response.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue('error');
    }
  },
);

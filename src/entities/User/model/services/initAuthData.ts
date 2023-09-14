import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserDataByIdQuery } from '../../api/userApi';
import { User } from '../types/user';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

export const initAuthData = createAsyncThunk<
  User, void, ThunkConfig<string>
>(
  'user/initAuthData',
  async (_, { rejectWithValue, dispatch }) => {
    let userId = localStorage.getItem(USER_LOCALSTORAGE_KEY);

    if (!userId) {
      throw new Error();
    }

    userId = JSON.parse(userId);
    try {
      const response = await dispatch(getUserDataByIdQuery(userId ?? '')).unwrap();

      return response;
    } catch (e) {
      console.log(e);
      return rejectWithValue('error');
    }
  },
);

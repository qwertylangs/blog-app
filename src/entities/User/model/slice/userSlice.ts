import { createSlice } from '@reduxjs/toolkit';
import { UserSchema } from '../types/user';

const initialState: UserSchema = {

};

const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {

  },
});

export const { actions: userActions, reducer: userReducer } = userSlice;

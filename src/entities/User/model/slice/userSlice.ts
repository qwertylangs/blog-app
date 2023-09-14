import { PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { UserSchema, User } from '../types/user';
import { buildSlice } from '@/shared/lib/store';
import { setFeatureFlags } from '@/shared/lib/features';
import { saveJsonSettings } from '../services/saveJsonSettings';
import { JsonSettings } from '../types/jsonSettings';
import { initAuthData } from '../services/initAuthData';

const initialState: UserSchema = {
  _inited: false,
};

export const userSlice = buildSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload;
      setFeatureFlags(action.payload.features);
      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(action.payload.id));
    },
    logout: (state) => {
      state.authData = undefined;
      localStorage.removeItem(USER_LOCALSTORAGE_KEY);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveJsonSettings.fulfilled, (state, action: PayloadAction<JsonSettings>) => {
        if (state.authData) {
          state.authData.jsonSettings = action.payload;
        }
      })
      .addCase(initAuthData.fulfilled, (state, action: PayloadAction<User>) => {
        state.authData = action.payload;
        state._inited = true;
        setFeatureFlags(action.payload.features);
      })
      .addCase(initAuthData.rejected, (state) => {
        state._inited = true;
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  actions: userActions,
  reducer: userReducer,
  useActions: useUserActions,
} = userSlice;

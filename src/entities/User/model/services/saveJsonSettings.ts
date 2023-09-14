import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { JsonSettings } from '../types/jsonSettings';
import { getUserAuthData } from '../selectors/getUserAuthData/getUserAuthData';
import { getJsonSettings } from '../selectors/jsonSettingsSelectors';
import { setJsonSettingsMutation } from '../../api/userApi';

export const saveJsonSettings = createAsyncThunk<
  JsonSettings, JsonSettings, ThunkConfig<string>
>(
  'user/saveJsonSettings',
  async (newJsonSettings, { rejectWithValue, getState, dispatch }) => {
    const userData = getUserAuthData(getState());
    const currentJsonSettings = getJsonSettings(getState());

    try {
      const response = await dispatch(setJsonSettingsMutation({
        id: userData?.id ?? '',
        jsonSettings: {
          ...currentJsonSettings,
          ...newJsonSettings,
        },
      })).unwrap();

      if (!response.jsonSettings) {
        throw new Error();
      }

      return response.jsonSettings;
    } catch (e) {
      console.log(e);
      return rejectWithValue('error');
    }
  },
);

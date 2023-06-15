import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginIsLoading } from './getLoginIsLoading';

describe('test getLoginError.test', () => {
  test('test error', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        isLoading: true,
      },
    };
    expect(getLoginIsLoading(state as StateSchema)).toEqual(true);
  });

  test('test empty state', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: undefined,
    };
    expect(getLoginIsLoading(state as StateSchema)).toEqual(false);
  });
});

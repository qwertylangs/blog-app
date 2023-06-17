import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginError } from './getLoginError';

describe('test getLoginError.test', () => {
  test('test error', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        error: 'error',
      },
    };
    expect(getLoginError(state as StateSchema)).toEqual('error');
  });

  test('test empty state', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: undefined,
    };
    expect(getLoginError(state as StateSchema)).toEqual(undefined);
  });
});

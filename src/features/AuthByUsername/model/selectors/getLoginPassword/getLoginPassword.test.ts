import { StateSchema } from '@/app/providers/StoreProvider';
import { getLoginPassword } from './getLoginPassword';

describe('test getLoginError.test', () => {
  test('test error', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        password: '123',
      },
    };
    expect(getLoginPassword(state as StateSchema)).toEqual('123');
  });

  test('test empty state', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: undefined,
    };
    expect(getLoginPassword(state as StateSchema)).toEqual('');
  });
});

import { StateSchema } from '@/app/providers/StoreProvider';
import { getLoginUsername } from './getLoginUsername';

describe('test getLoginError.test', () => {
  test('test error', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        username: 'XXX',
      },
    };
    expect(getLoginUsername(state as StateSchema)).toEqual('XXX');
  });

  test('test empty state', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: undefined,
    };
    expect(getLoginUsername(state as StateSchema)).toEqual('');
  });
});

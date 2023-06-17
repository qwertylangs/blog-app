import { LoginSchema } from '../types/loginSchema';
import { loginActions, loginReducer } from './loginSlice';

describe('test loginSlice.test', () => {
  test('set username', () => {
    const state:DeepPartial<LoginSchema> = {
      username: '123',
    };
    expect(loginReducer(state as LoginSchema, loginActions.setUsername('qwerty'))).toEqual({ username: 'qwerty' });
  });

  test('set password', () => {
    const state:DeepPartial<LoginSchema> = {
      password: '123',
    };
    expect(loginReducer(state as LoginSchema, loginActions.setPassword('qwerty'))).toEqual({ password: 'qwerty' });
  });
});

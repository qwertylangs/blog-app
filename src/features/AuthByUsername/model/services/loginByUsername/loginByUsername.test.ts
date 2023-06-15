import axios from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { userActions } from 'entities/User';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { loginByUsername } from './loginByUsername';

jest.mock('axios');
const mockedAxios = jest.mocked(axios, true);

describe('test loginByUsername.test', () => {
  let dispatch: Dispatch;
  let getState: () => StateSchema;

  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn();
  });

  // test('success', async () => {
  //   const userData = { username: 'xxx', id: '1' };
  //   mockedAxios.post.mockResolvedValue(
  //     Promise.resolve({ data: userData }),
  //   );
  //   const action = loginByUsername({ username: 'xxx', password: '1' });
  //   const result = await action(dispatch, getState, undefined);

  //   expect(mockedAxios.post).toHaveBeenCalled();
  //   expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userData));
  //   expect(dispatch).toHaveBeenCalledTimes(3);

  //   expect(result.meta.requestStatus).toBe('fulfilled');
  //   expect(result.payload).toEqual({ username: 'xxx', id: '1' });
  // });

  // test('error', async () => {
  //   const userData = { username: 'xxx', id: '1' };
  //   mockedAxios.post.mockResolvedValue(
  //     Promise.resolve({ status: 403 }),
  //   );
  //   const action = loginByUsername({ username: 'xxx', password: '1' });
  //   const result = await action(dispatch, getState, undefined);

  //   expect(mockedAxios.post).toHaveBeenCalled();

  //   expect(dispatch).toHaveBeenCalledTimes(2);
  //   expect(result.meta.requestStatus).toBe('rejected');
  //   expect(result.payload).toEqual('error');
  // });

  test('success', async () => {
    const userData = { username: 'xxx', id: '1' };
    mockedAxios.post.mockResolvedValue(
      Promise.resolve({ data: userData }),
    );

    const thunk = new TestAsyncThunk(loginByUsername);
    const result = await thunk.callThunk({ username: 'xxx', password: '123' });

    expect(mockedAxios.post).toHaveBeenCalled();
    expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userData));
    expect(thunk.dispatch).toHaveBeenCalledTimes(3);

    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual({ username: 'xxx', id: '1' });
  });

  test('error', async () => {
    mockedAxios.post.mockResolvedValue(
      Promise.resolve({ status: 403 }),
    );

    const thunk = new TestAsyncThunk(loginByUsername);
    const result = await thunk.callThunk({ username: 'xxx', password: '123' });

    expect(mockedAxios.post).toHaveBeenCalled();

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual('error');
  });
});

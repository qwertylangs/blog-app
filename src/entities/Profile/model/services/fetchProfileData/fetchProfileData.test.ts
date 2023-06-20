import axios from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { userActions } from 'entities/User';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { fetchProfileData } from './fetchProfileData';

describe('test fetchProfileData.test', () => {
  test('success', async () => {
    const data = {
      age: 20,
      city: 'Mogilev',
      country: Country.BELARUS,
      currency: Currency.RUB,
      lastname: 'QWERT',
      first: 'Egor',
      username: 'amogus',
    };

    const thunk = new TestAsyncThunk(fetchProfileData);
    thunk.api.get.mockResolvedValue(
      Promise.resolve({ data }),
    );
    const result = await thunk.callThunk();

    expect(thunk.api.get).toHaveBeenCalled();
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });

  test('error', async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);
    thunk.api.get.mockResolvedValue(
      Promise.resolve({ status: 403 }),
    );
    const result = await thunk.callThunk();

    expect(thunk.api.get).toHaveBeenCalled();

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual('error');
  });
});

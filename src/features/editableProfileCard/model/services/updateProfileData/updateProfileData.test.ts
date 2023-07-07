import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { updateProfileData } from './updateProfileData';
import { ValidateProfileError } from '../../types/editableProfileCardSchema';

describe('test updateProfileData.test', () => {
  const data = {
    age: 20,
    city: 'Mogilev',
    country: Country.BELARUS,
    currency: Currency.RUB,
    lastname: 'QWERT',
    first: 'Egor',
    username: 'amogus',
  };

  test('success', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: data,
      },
    });

    thunk.api.put.mockResolvedValue(
      Promise.resolve({ data }),
    );
    const result = await thunk.callThunk();

    expect(thunk.api.put).toHaveBeenCalled();
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);

    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });

  test('server error', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: data,
      },
    });
    thunk.api.put.mockResolvedValue(
      Promise.resolve({ status: 403 }),
    );
    const result = await thunk.callThunk();

    expect(thunk.api.put).toHaveBeenCalled();

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual([ValidateProfileError.SERVER_ERROR]);
  });

  test('validate error', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: { ...data, lastname: '' },
      },
    });
    thunk.api.put.mockResolvedValue(
      Promise.resolve({ data }),
    );
    const result = await thunk.callThunk();

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
  });
});

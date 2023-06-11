import { StateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from '@reduxjs/toolkit';
import { getCounterValue } from './getCounterValue';

describe('test getCounterValue.test', () => {
  test('test get counter value', () => {
    const state: DeepPartial<StateSchema> = {
      counter: { value: 12 },
    };
    expect(getCounterValue(state as StateSchema)).toEqual(12);
  });
});

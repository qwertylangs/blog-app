import { StateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from '@reduxjs/toolkit';
import { getCounter } from './getCounter';

describe('test getCounter', () => {
  test('should return counter value', () => {
    const state: DeepPartial<StateSchema> = {
      counter: { value: 12 },
    };
    expect(getCounter(state as StateSchema)).toEqual({ value: 12 });
  });
});

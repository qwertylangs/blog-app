import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { counterActions, counterReducer } from './counterSlice';
import { counterSchema } from '../types/counterSchema';

describe('test counterSlice.test', () => {
  test('increment', () => {
    const state: counterSchema = { value: 12 };
    expect(counterReducer(state, counterActions.increment())).toEqual({ value: 13 });
  });

  test('decrement', () => {
    const state: counterSchema = { value: 12 };
    expect(counterReducer(state, counterActions.decrement())).toEqual({ value: 11 });
  });

  test('with empty state', () => {
    expect(counterReducer(undefined, counterActions.increment())).toEqual({ value: 1 });
  });
});

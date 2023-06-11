import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { StateSchema } from './StateSchema';

export const createReduxStore = (initialState?: StateSchema) => configureStore<StateSchema>({
  devTools: __IS_DEV__,
  reducer: { counter: counterReducer },
  preloadedState: initialState,
});

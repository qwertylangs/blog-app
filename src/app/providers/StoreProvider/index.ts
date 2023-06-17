import { StoreProvider } from './ui/StoreProvider';
import { createReduxStore, AppDispatch } from './config/store';
import type {
  StateSchema, StoreWithReducerManager, StateSchemaKey, ThunkConfig,
} from './config/StateSchema';

export {
  StoreProvider,
  createReduxStore,
  StateSchema,
  StoreWithReducerManager,
  StateSchemaKey,
  AppDispatch,
  ThunkConfig,
};

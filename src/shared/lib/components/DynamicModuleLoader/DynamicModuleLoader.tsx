import { Reducer } from '@reduxjs/toolkit';
import { StateSchemaKey, StoreWithReducerManager } from 'app/providers/StoreProvider';
import { FC, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

export type ReducersList = {
  [name in StateSchemaKey]?: Reducer;
}

interface DynamicModuleLoaderProps {
  reducers: ReducersList,
  removeAfterUnmount?: boolean,
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
  const {
    reducers, children, removeAfterUnmount,
  } = props;
  const store = useStore() as StoreWithReducerManager;
  const dispatch = useDispatch();

  useEffect(() => {
    Object.entries(reducers).forEach(([name, reducer]) => {
      store.reducerManager.add(name as StateSchemaKey, reducer);
      dispatch({ type: `@INIT ${name} Reducer` });
    });

    return () => {
      Object.entries(reducers).forEach(([name]) => {
        if (removeAfterUnmount) {
          store.reducerManager.remove(name as StateSchemaKey);
          dispatch({ type: `@DESTROY ${name} Reducer` });
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
  // eslint-disable-next-line
    <>
      {children}
    </>
  );
};

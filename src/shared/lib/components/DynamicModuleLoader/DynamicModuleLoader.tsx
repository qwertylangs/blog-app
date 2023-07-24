import { Reducer } from '@reduxjs/toolkit';
import { StateSchema, StateSchemaKey, StoreWithReducerManager } from 'app/providers/StoreProvider';
import React, { FC, ReactNode, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

export type ReducersList = {
  [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>;
}

interface DynamicModuleLoaderProps {
  reducers: ReducersList,
  removeAfterUnmount?: boolean,
  children: ReactNode;
}

export const DynamicModuleLoader = (props: DynamicModuleLoaderProps) => {
  const {
    reducers, children, removeAfterUnmount = true,
  } = props;
  const store = useStore() as StoreWithReducerManager;
  const dispatch = useDispatch();

  useEffect(() => {
    Object.entries(reducers).forEach(([name, reducer]) => {
      const isMounted = !!store.reducerManager.getReducerMap()[name as StateSchemaKey];

      if (!isMounted) {
        store.reducerManager.add(name as StateSchemaKey, reducer);
        dispatch({ type: `@INIT ${name} Reducer` });
      }
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

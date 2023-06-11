import {
  FC, Suspense, useEffect, useState,
} from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { Navbar } from 'widgets/Navbar';
import { SideBar } from 'widgets/SideBar';
import { AppRouter } from './providers/Router';
import { useTheme } from './providers/ThemeProvider/lib/useTheme';

const App: FC = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  console.log(__IS_DEV__);

  return (
    <main className={classNames('app', {}, [])}>
      <Suspense fallback="">
        <Navbar />

        <div className="content-page">
          <SideBar />
          <AppRouter />
        </div>
      </Suspense>
    </main>
  );
};

export default App;

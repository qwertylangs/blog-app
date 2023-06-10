import { FC, Suspense, useEffect } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { AppRouter } from './providers/Router';
import { useTheme } from './providers/ThemeProvider/lib/useTheme';
import './styles/index.scss';

const App: FC = () => {
  const { theme } = useTheme();

  return (
    <main className={classNames('app', {}, [theme])}>
      <Suspense fallback="">
        <Navbar />
        <div className="content-page">
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </main>
  );
};

export default App;
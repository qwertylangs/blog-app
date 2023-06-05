import { FC, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { RouteConfig } from 'shared/config/routeConfig/routeConfig';

const AppRouter: FC = () => (
  <div className="page-wrapper">
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {Object.values(RouteConfig).map(({ element, path }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </Suspense>
  </div>
);

export default AppRouter;

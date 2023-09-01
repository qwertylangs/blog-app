import { screen } from '@testing-library/react';
import { getRouteAbout, getRouteAdminPanel, getRouteProfile } from '@/shared/const/router';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { AppRouter } from '..';
import { UserRole } from '@/entities/User';

describe('AppRouter', () => {
  test('Станица должна отображаться', async () => {
    componentRender(<AppRouter />, { route: getRouteAbout() });

    const page = await screen.findByTestId('AboutPage');
    expect(page).toBeInTheDocument();
  });

  test('Станица не найдена', async () => {
    componentRender(<AppRouter />, { route: '/afaef' });

    const page = await screen.findByTestId('NotFoundPage');
    expect(page).toBeInTheDocument();
  });

  test('редирект неавтоизованного', async () => {
    componentRender(<AppRouter />, { route: getRouteProfile('1') });

    const page = await screen.findByTestId('MainPage');
    expect(page).toBeInTheDocument();
  });

  test('доступ авторизованному', async () => {
    componentRender(<AppRouter />, { route: getRouteProfile('1'), initialState: { user: { _inited: true, authData: {} } } });

    const page = await screen.findByTestId('ProfilePage');
    expect(page).toBeInTheDocument();
  });

  test('доступ к запрещенному по роли', async () => {
    componentRender(<AppRouter />, { route: getRouteAdminPanel(), initialState: { user: { _inited: true, authData: {} } } });

    const page = await screen.findByTestId('ForbiddenPage');
    expect(page).toBeInTheDocument();
  });

  test('доступ к разрешенному по роли', async () => {
    componentRender(<AppRouter />, { route: getRouteAdminPanel(), initialState: { user: { _inited: true, authData: { role: [UserRole.ADMIN] } } } });

    const page = await screen.findByTestId('AdminPanelPage');
    expect(page).toBeInTheDocument();
  });
});

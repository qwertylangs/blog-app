import { fireEvent, render, screen } from '@testing-library/react';
import renderWithTranslation from 'shared/lib/tests/renderWithTranslation/renderWithTranslation';
import { SideBar } from './SideBar';

describe('sidebar', () => {
  test('def sidebar', () => {
    renderWithTranslation(<SideBar />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  test('toggle sidebar', () => {
    renderWithTranslation(<SideBar />);
    const toggleBtn = screen.getByTestId('sidebar-toggle');

    fireEvent.click(toggleBtn);
    expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
  });
});

import { render, screen } from '@testing-library/react';
import { Button, ButtonTheme } from './Button';

describe('classNames', () => {
  test('def btn', () => {
    render(<Button>Button</Button>);
    expect(screen.getByText('Button')).toBeInTheDocument();
  });

  test('test clear theme', () => {
    render(<Button theme={ButtonTheme.CLEAR}>Button</Button>);
    expect(screen.getByText('Button')).toHaveClass('clear');
  });
});

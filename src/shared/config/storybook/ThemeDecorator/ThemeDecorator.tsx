import { Story } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';

export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) => (
  <body className={`${theme}`}>
    <StoryComponent />
  </body>
);

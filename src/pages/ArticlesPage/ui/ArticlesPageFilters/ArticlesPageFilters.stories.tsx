import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ArticlesPageFilters } from './ArticlesPageFilters';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
  title: 'pages/ArticlesPageFilters',
  component: ArticlesPageFilters,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    to: '/',
  },
} as ComponentMeta<typeof ArticlesPageFilters>;

const Template: ComponentStory<typeof ArticlesPageFilters> = (args) => <ArticlesPageFilters {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};
Primary.decorators = [StoreDecorator({})];

import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import ArticlesPage from './ArticlesPage';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
  title: 'pages/ArticlesPage',
  component: ArticlesPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    to: '/',
  },
} as ComponentMeta<typeof ArticlesPage>;

const Template: ComponentStory<typeof ArticlesPage> = (args) => <ArticlesPage {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};
Primary.decorators = [StoreDecorator({})];

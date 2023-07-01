import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { TabItem, Tabs } from './Tabs';

export default {
  title: 'shared/Tabs',
  component: Tabs,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    to: '/',
  },
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

const tabs: TabItem<string>[] = [
  {
    value: 'tab1',
    content: 'Главная',
  },
  {
    value: 'tab2',
    content: 'О нас',
  },
  {
    value: 'tab3',
    content: 'Статьи',
  },
];

export const Primary = Template.bind({});
Primary.args = {
  tabs,
  value: 'tab1',
  // onTabClick: (value: string) => console.log(value),
};

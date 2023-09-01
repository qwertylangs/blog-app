import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import withMock from 'storybook-addon-mock';
import { NotificationList } from './NotificationList';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Article } from '@/entities/Article';

export default {
  title: 'entities/NotificationList',
  component: NotificationList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    to: '/',
  },
  decorators: [withMock],
} as ComponentMeta<typeof NotificationList>;

const article: Article = {
  id: '1',
  blocks: [],
  type: [],
  createdAt: '',
  img: '',
  title: 'title',
  subtitle: 'subtitle',
  user: {
    id: '1',
    username: 'XXXXXXXX',
  },
  views: 0,
};

const Template: ComponentStory<typeof NotificationList> = (args: any) => <NotificationList {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};

Primary.decorators = [StoreDecorator({})];

Primary.parameters = {
  mockData: [
    {
      url: `${__API__}/notifications`,
      method: 'GET',
      status: 200,
      response: [
        { ...article, id: '1' },
        { ...article, id: '2' },
        { ...article, id: '3' },
      ],
    },
  ],
};

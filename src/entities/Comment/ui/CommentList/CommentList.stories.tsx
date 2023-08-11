import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { CommentList } from './CommentList';

export default {
  title: 'entities/Comment/CommentList',
  component: CommentList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    to: '/',
  },
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => <CommentList {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  comments: [
    { id: '1', text: 'test1', user: { id: '1', username: 'test1', avatar: 'https://i.pravatar.cc/100' } },
    { id: '2', text: 'test2', user: { id: '2', username: 'test2', avatar: 'https://i.pravatar.cc/100' } },
    { id: '3', text: 'test3', user: { id: '3', username: 'test3', avatar: 'https://i.pravatar.cc/100' } },
  ],
};

export const Loading = Template.bind({});
Loading.args = {
  comments: [
    { id: '1', text: 'test1', user: { id: '1', username: 'test1' } },
    { id: '2', text: 'test2', user: { id: '2', username: 'test2' } },
    { id: '3', text: 'test3', user: { id: '3', username: 'test3' } },
  ],
  isLoading: true,
};
Loading.decorators = [ThemeDecorator(Theme.DARK)];

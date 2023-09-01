import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CommentCard } from './CommentCard';
import AvatarImg from '@/shared/assets/tests/avatar.jpg';

export default {
  title: 'entities/Comment/CommentCard',
  component: CommentCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    to: '/',
  },
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => <CommentCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  comment: {
    id: '1',
    text: 'some comment',
    user: {
      id: '1',
      username: 'XXXXX',
      avatar: AvatarImg,
    },
  },
};

export const Loading = Template.bind({});
Loading.args = {
  comment: {
    id: '1',
    text: 'some comment',
    user: {
      id: '1',
      username: 'XXXXX',
      avatar: AvatarImg,
    },
  },
  isLoading: true,
};

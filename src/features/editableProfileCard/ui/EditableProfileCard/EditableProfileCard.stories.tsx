import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { EditableProfileCard } from './EditableProfileCard';

export default {
  title: 'features/EditableProfileCard',
  component: EditableProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof EditableProfileCard>;

const Template: ComponentStory<typeof EditableProfileCard> = (args) => <EditableProfileCard id="1" />;

export const Normal = Template.bind({});
Normal.args = {

};

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { EditableProfileCard } from './EditableProfileCard';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Country } from '@/entities/Country';

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
Normal.decorators = [StoreDecorator({
  profile: {
    form: {
      age: 19,
      avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
      city: '1',
      country: Country.ARMENIA,
      username: 'X',
      first: 'X',
      lastname: 'X',
    },
  },
})];

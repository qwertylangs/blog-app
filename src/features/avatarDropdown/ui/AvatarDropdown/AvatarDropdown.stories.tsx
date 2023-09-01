import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AvatarDropdown } from './AvatarDropdown';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { UserRole } from '@/entities/User';

export default {
  title: 'features/AvatarDropdown',
  component: AvatarDropdown,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AvatarDropdown>;

const Template: ComponentStory<typeof AvatarDropdown> = (args) => <AvatarDropdown {...args} />;

export const Normal = Template.bind({});
Normal.args = {

};
Normal.decorators = [StoreDecorator({
  user: {
    authData: {
      id: '1',
      username: 'XXXXX',
      avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
      role: [UserRole.ADMIN],
    },
  },
})];

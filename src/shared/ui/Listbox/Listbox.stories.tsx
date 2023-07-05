import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Listbox } from './Listbox';

export default {
  title: 'shared/Listbox',
  component: Listbox,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    to: '/',
  },
} as ComponentMeta<typeof Listbox>;

// const Template: ComponentStory<typeof Listbox> = (args) => <Listbox {...args} />;

// export const Primary = Template.bind({});
// Primary.args = {
// };

import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Overlay } from './Overlay';

export default {
  title: 'shared/Overlay',
  component: Overlay,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    to: '/',
  },
} as ComponentMeta<typeof Overlay>;

const Template: ComponentStory<typeof Overlay> = (args) => <Overlay {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};

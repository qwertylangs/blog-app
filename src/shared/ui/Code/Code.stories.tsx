import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Code } from './Code';

export default {
  title: 'shared/Code',
  component: Code,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    to: '/',
  },
} as ComponentMeta<typeof Code>;

const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  text: `export default {
    title: 'shared/Code',
    component: Code,
    argTypes: {
      backgroundColor: { control: 'color' },
    },
    args: {
      to: '/',
    },
  } as ComponentMeta<typeof Code>;`,
};

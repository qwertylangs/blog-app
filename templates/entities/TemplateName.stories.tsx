import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { TemplateName } from './TemplateName';

export default {
  title: 'entities/TemplateName',
  component: TemplateName,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    to: '/',
  },
} as ComponentMeta<typeof TemplateName>;

const Template: ComponentStory<typeof TemplateName> = (args) => <TemplateName {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};

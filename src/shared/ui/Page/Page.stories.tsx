import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Page } from './Page';

export default {
  title: 'shared/Page',
  component: Page,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    to: '/',
  },
} as ComponentMeta<typeof Page>;

const Template: ComponentStory<typeof Page> = (args) => <Page {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};

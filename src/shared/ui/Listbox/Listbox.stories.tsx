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
  decorators: [
    (Story) => (
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',
      }}
      >
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Listbox>;

const Template: ComponentStory<typeof Listbox> = (args) => <Listbox {...args} />;

const items = [
  {
    content: 'Item 1',
    value: '1',
  },
  {
    content: 'Item 2',
    value: '2',
    disabled: true,
  },
  {
    content: 'Item 3',
    value: '3',
  },
];

export const BottomRight = Template.bind({});
BottomRight.args = {
  items,
  defaultValue: '1',
  label: 'choose item',
};

export const BottomLeft = Template.bind({});
BottomLeft.args = {
  direction: 'bottom left',
  items,
  defaultValue: '1',
  label: 'choose item',
};

export const TopRight = Template.bind({});
TopRight.args = {
  direction: 'top right',
  items,
  defaultValue: '1',
  label: 'choose item',
};

export const TopLeft = Template.bind({});
TopLeft.args = {
  direction: 'top left',
  items,
  defaultValue: '1',
  label: 'choose item',
};

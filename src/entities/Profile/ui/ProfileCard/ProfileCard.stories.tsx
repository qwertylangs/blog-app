import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import avatar from 'shared/assets/tests/avatar.jpg';
import { ProfileCard } from './ProfileCard';

export default {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  data: {
    age: 20,
    city: 'Mogilev',
    country: Country.BELARUS,
    currency: Currency.RUB,
    lastname: 'QWERT',
    first: 'Egor',
    username: 'amogus',
    avatar,
  },
};
Normal.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = {
  data: {
    age: 20,
    city: 'Mogilev',
    country: Country.BELARUS,
    currency: Currency.RUB,
    lastname: 'QWERT',
    first: 'Egor',
    username: 'amogus',
    avatar,
  },
};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
Loading.decorators = [StoreDecorator({})];

export const Error = Template.bind({});
Error.args = {
  error: 'error',
};
Error.decorators = [StoreDecorator({})];

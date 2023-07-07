import { componentRender, componentRenderOptions } from 'shared/lib/tests/componentRender/componentRender';
import { Profile } from 'entities/Profile';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { $api } from 'shared/api/api';
import { profileReducer } from '../../model/slice/profileSlice';
import { EditableProfileCard } from './EditableProfileCard';

const profile: Profile = {
  id: '1',
  first: 'egor',
  lastname: 'p',
  age: 21,
  country: Country.BELARUS,
  currency: Currency.RUB,
  username: 'qwerty',
  city: 'Moscow',
};
const options: componentRenderOptions = {
  initialState: {
    profile: {
      form: profile,
      data: profile,
      readonly: true,
      isLoading: false,
      error: undefined,
    },
    user: {
      authData: { id: '1' },
    },
  },
  asyncReducers: {
    profile: profileReducer,
  },
};

describe('Sidebar', () => {
  test('can adit profile', async () => {
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditBtn'));
    expect(screen.getByTestId('EditableProfileCardHeader.CancelBtn')).toBeInTheDocument();
  });

  test('При отмене значения должны обнуляться', async () => {
    componentRender(<EditableProfileCard id="1" />, options);

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditBtn'));

    await userEvent.clear(screen.getByTestId('ProfileCard.Firstname'));
    await userEvent.clear(screen.getByTestId('ProfileCard.Lastname'));

    await userEvent.type(screen.getByTestId('ProfileCard.Firstname'), 'user');
    await userEvent.type(screen.getByTestId('ProfileCard.Lastname'), 'user');

    expect(screen.getByTestId('ProfileCard.Firstname')).toHaveValue('user');
    expect(screen.getByTestId('ProfileCard.Lastname')).toHaveValue('user');

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelBtn'));

    expect(screen.getByTestId('ProfileCard.Firstname')).toHaveValue(profile.first);
    expect(screen.getByTestId('ProfileCard.Lastname')).toHaveValue(profile.lastname);
  });

  test('При пустом импуте ошибка', async () => {
    componentRender(<EditableProfileCard id="1" />, options);

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditBtn'));

    await userEvent.clear(screen.getByTestId('ProfileCard.Firstname'));
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveBtn'));

    expect(screen.getByTestId('EditableProfileCard.Error.Paragraph')).toBeInTheDocument();
  });

  test('put запрос при отсутвии ошибок', async () => {
    const mockPutReq = jest.spyOn($api, 'put').mockResolvedValue({ data: profile });

    componentRender(<EditableProfileCard id="1" />, options);

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditBtn'));

    await userEvent.type(screen.getByTestId('ProfileCard.Firstname'), 'user');
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveBtn'));
    expect(mockPutReq).toBeCalledTimes(1);
  });
});

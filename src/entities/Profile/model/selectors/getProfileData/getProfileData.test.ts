import { StateSchema } from 'app/providers/StoreProvider';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { getProfileData } from './getProfileData';

describe('test getProfileData.test', () => {
  test('test data', () => {
    const data = {
      age: 20,
      city: 'Mogilev',
      country: Country.BELARUS,
      currency: Currency.RUB,
      lastname: 'QWERT',
      first: 'Egor',
      username: 'amogus',
    };

    const state: DeepPartial<StateSchema> = {
      profile: {
        data,
      },
    };
    expect(getProfileData(state as StateSchema)).toEqual(data);
  });

  test('test empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileData(state as StateSchema)).toEqual(undefined);
  });
});

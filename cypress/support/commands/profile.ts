import { Profile } from '../../../src/entities/Profile';

export const updateProfile = (firstname: string, lastname: string) => {
  cy.getByTestId('EditableProfileCardHeader.EditBtn').click();
  cy.getByTestId('ProfileCard.Firstname').clear().type(firstname);
  cy.getByTestId('ProfileCard.Lastname').clear().type(lastname);
  cy.getByTestId('EditableProfileCardHeader.SaveBtn').click();
};

export const resetProfile = (profileId: string) => {
  return cy.request({
    method: 'PUT',
    url: `http://localhost:8000/profile/${profileId}`,
    headers: { Authorization: 'xxxxx' },
    body: {
      id: '4',
      first: 'test',
      lastname: 'user',
      age: 6,
      currency: 'RUB',
      country: 'Russia',
      city: 'Moscow',
      username: 'testuser',
      avatar: 'https://rg.ru/uploads/images/125/44/18/11111111.jpg',
    },
  }).then((res) => res.body);
};

declare global {
  namespace Cypress {
    interface Chainable {
      updateProfile(firstname: string, lastname: string): Chainable<void>
      resetProfile(profileId: string): Chainable<Profile>
    }
  }
}

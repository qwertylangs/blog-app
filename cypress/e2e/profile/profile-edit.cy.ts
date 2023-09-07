import { selectByTestId } from 'cypress/helpers/selectByTestId'

let profileId: string;

describe('изменение профиля', () => {
  beforeEach(() => {
    cy.login().then(({ id }) => {
      profileId = id
      cy.visit(`/profile/${id}`);
    });
  });

  afterEach(() => {
    cy.resetProfile(profileId);
  })

  it('заходит на профиль', () => {
    cy.get(selectByTestId('ProfilePage')).should('exist');
    cy.get(selectByTestId('ProfileCard.Firstname')).should('have.value', 'test');
  });

  it('редактирование профиля', () => {
    const newFirstName = 'newFirstname';
    const newLastName = 'newLastname';
    cy.updateProfile(newFirstName, newLastName);
    cy.getByTestId('ProfileCard.Firstname').should('have.value', newFirstName);
    cy.getByTestId('ProfileCard.Lastname').should('have.value', newLastName);
  });
});

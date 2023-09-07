import { selectByTestId } from '../../helpers/selectByTestId';

describe('routing', () => {
  describe('не авторизованный пользователь', () => {
    it('переход на главную', () => {
      cy.visit('/');
      cy.get(selectByTestId('MainPage')).should('exist');
    });
    it('редирект неавторизованного', () => {
      cy.visit('/profile/1');
      cy.get(selectByTestId('MainPage')).should('exist');
    });
    it('переход на несуществующий url', () => {
      cy.visit('/pwegsryhy53562');
      cy.get(selectByTestId('NotFoundPage')).should('exist');
    });
  });

  describe('авторизованный пользователь', () => {
    beforeEach(() => {
      cy.login('admin', '123');
    });

    it('открывает страницу профиля', () => {
      cy.visit('/profile/1');
      cy.get(selectByTestId('ProfilePage')).should('exist');
    });

    it('открывает страницу статей', () => {
      cy.visit('/articles');
      cy.get(selectByTestId('ArticlesPage')).should('exist');
    });
  });
});

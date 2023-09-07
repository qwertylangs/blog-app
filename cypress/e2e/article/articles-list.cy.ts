describe('загрузка статей', () => {
  beforeEach(() => {
    cy.login().then(() => {
      cy.visit('articles');
    });
  });

  it('статьи загружаются', () => {
    cy.getByTestId('ArticleList').should('exist');
    cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
  });

  // почемуто не работает
  it.skip('на стабах(фикстурах)', () => {
    cy.intercept('GET', '**/articles?*', { fixture: 'articles.json' });
    cy.getByTestId('ArticleList').should('exist');
    cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
  });
});

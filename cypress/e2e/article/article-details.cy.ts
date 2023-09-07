let currentArticleId: string;

describe('пользовтаель открывет стаью', () => {
  beforeEach(() => {
    cy.login();
    cy.createArticle().then((article) => {
      currentArticleId = article.id;
      cy.visit(`/articles/${currentArticleId}`);
    });
  });
  afterEach(() => cy.removeArticle(currentArticleId));

  it.skip('отображена статья', () => {
    cy.getByTestId('ArticleDetails.Info').should('exist');
  });

  it.skip('виден список рекомендаций', () => {
    cy.getByTestId('ArticleRecommendationsList').should('exist');
  });

  it.skip('возможность оставить комментарий', () => {
    cy.getByTestId('ArticleDetails.Info').should('exist');
    cy.getByTestId('AddCommentForm').scrollIntoView().should('exist');
    cy.addComment('test comment');
    cy.getByTestId('CommentCard.Content').should('have.length', 1);
  });

  it('возможность оставить отзыв', () => {
    cy.intercept('GET', '**/articles/**', { fixture: 'article-details.json' });
    cy.getByTestId('ArticleDetails.Info').should('exist');
    cy.getByTestId('RatingCard').scrollIntoView().should('exist');
    cy.setRate(4, 'feedback');
    cy.get('[data-selected=true]').should('have.length', 4);
  });
});

import { Article } from '../../../src/entities/Article';

const defaultArticle = {
  id: '120',
  userId: '4',
  title: 'Экономика в IT: влияние технологий на мировую экономику',
  subtitle: 'Изучаем роль IT в современной экономике',
  img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvlv-soMvCtEikn0nGKoEEzmvfFfsUe911NCPg'
  + 'K6swGTH3sEqy3Ncw7-ALPWT0mH3gUi4&usqp=CAU',
  views: 1895,
  createdAt: '15.02.2024',
  type: [
    'ECONOMICS',
    'IT',
  ],
  blocks: [
    {
      id: '1',
      type: 'TEXT',
      title: 'Роль IT в современной экономике',
      paragraphs: [
        'Развитие информационных технологий (IT) существенно изменило мировую экономику.',
        'IT стало неотъемлемой частью бизнес-процессов в различных отраслях, от финансов до производства.',
        'В этой статье мы рассмотрим влияние IT на мировую экономику, его роль в инновационном развитии и вызовы,'
        + ' с которыми сталкиваются компании и государства.',
      ],
    },
  ],
};

export const createArticle = (article?: Article) => {
  return cy.request({
    method: 'POST',
    url: 'http://localhost:8000/articles',
    headers: { Authorization: 'xxxxx' },
    body: article ?? defaultArticle,
  }).then((response) => response.body);
};

export const removeArticle = (articleId: string) => {
  return cy.request({
    method: 'DELETE',
    url: `http://localhost:8000/articles/${articleId}`,
    headers: { Authorization: 'xxxxx' },
  });
};

declare global {
  namespace Cypress {
    interface Chainable {
      createArticle(article?: Article): Chainable<Article>
      removeArticle(articleId: string): Chainable<void>
    }
  }
}

import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchNextArticles } from './fetchNextArticles';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

jest.mock('../fetchArticlesList/fetchArticlesList');

describe('test fetchNextArticles.test', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticles, {
      articlesPage: {
        entities: {},
        ids: [],
        hasMore: true,
        isLoading: false,
        limit: 5,
        page: 1,
      },
    });

    await thunk.callThunk();

    expect(thunk.dispatch).toBeCalledTimes(4);
    expect(fetchArticlesList).toBeCalled();
  });

  test('not called', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticles, {
      articlesPage: {
        entities: {},
        ids: [],
        hasMore: false,
        isLoading: false,
        limit: 5,
        page: 1,
      },
    });

    await thunk.callThunk();

    expect(thunk.dispatch).toBeCalledTimes(2);
    expect(fetchArticlesList).not.toHaveBeenCalled();
  });

  test('not called loading', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticles, {
      articlesPage: {
        entities: {},
        ids: [],
        hasMore: true,
        isLoading: true,
        limit: 5,
        page: 1,
      },
    });

    await thunk.callThunk();

    expect(thunk.dispatch).toBeCalledTimes(2);
    expect(fetchArticlesList).not.toHaveBeenCalled();
  });
});

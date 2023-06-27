import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import { getArticlesPageLimit } from '../../selectors/articlesPageSelectors';

interface FetchArticlesListProps {
  page?: number;
}

export const fetchArticlesList = createAsyncThunk<
  Article[], FetchArticlesListProps, ThunkConfig<string>
>(
  'ArticlesPage/fetchArticlesList',
  async (props, { rejectWithValue, extra: { api }, getState }) => {
    const { page = 1 } = props;
    const limit = getArticlesPageLimit(getState());

    try {
      const response = await api.get<Article[]>('/articles', {
        params: {
          _expand: 'user',
          _limit: limit,
          _page: page,
        },
      });

      if (!response.data) {
        throw new Error();
      }
      return response.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue('error');
    }
  },
);

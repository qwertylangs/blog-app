import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';

export const fetchArticleRecommendations = createAsyncThunk<
  Article[], void, ThunkConfig<string>
>(
  'ArticlesPage/fetchArticleRecommendations',
  async (_, { rejectWithValue, extra: { api } }) => {
    try {
      const response = await api.get<Article[]>('/articles', {
        params: {
          _expand: 'user',
          _limit: 4,
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

import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from '../types/article';

export const fetchArticleById = createAsyncThunk<
  Article, string, ThunkConfig<string>
>(
  'article/fetchArticleById',
  async (id, { rejectWithValue, extra: { api } }) => {
    try {
      const response = await api.get<Article>(`/articles/${id}`, {
        params: {
          _expand: 'user',
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

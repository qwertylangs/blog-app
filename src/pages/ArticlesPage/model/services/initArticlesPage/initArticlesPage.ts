import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { SortOrder } from '@/shared/types/sort';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { getArticlesPageInited } from '../../selectors/articlesPageSelectors';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { articlesPageActions } from '../../slice/articlesPageSlice';

export const initArticlesPage = createAsyncThunk<
  void, URLSearchParams, ThunkConfig<string>
>(
  'ArticlesPage/initArticlesPage',
  async (searchParams, { getState, dispatch }) => {
    const inited = getArticlesPageInited(getState());

    if (!inited) {
      const searchFromUrl = searchParams.get('search');
      const sortFromUrl = searchParams.get('sort');
      const orderFromUrl = searchParams.get('order');
      const typeFromUrl = searchParams.get('type');

      if (searchFromUrl) {
        dispatch(articlesPageActions.setSearch(searchFromUrl));
      }
      if (sortFromUrl) {
        dispatch(articlesPageActions.setSort(sortFromUrl as ArticleSortField));
      }
      if (orderFromUrl) {
        dispatch(articlesPageActions.setOrder(orderFromUrl as SortOrder));
      }
      if (typeFromUrl) {
        dispatch(articlesPageActions.setType(typeFromUrl as ArticleType));
      }

      dispatch(articlesPageActions.initState());
      dispatch(fetchArticlesList({}));
    }
  },
);

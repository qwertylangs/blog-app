import { createSelector } from '@reduxjs/toolkit';
import { getArticleDetailsData } from '@/entities/Article';
import { getUserAuthData } from '@/entities/User';
import { buildSelector } from '@/shared/lib/store';
import { StateSchema } from '@/app/providers/StoreProvider';

export const getCanEditArticle = createSelector(
  getUserAuthData,
  getArticleDetailsData,
  (user, article) => {
    if (!user || !article) {
      return false;
    }

    return user?.id === article?.user?.id;
  },
);

export const [useArticleById] = buildSelector(
  (state: StateSchema, id: string) => state.articlesPage?.entities[id],
);

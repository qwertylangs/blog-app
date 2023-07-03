import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { ArticleDetails, ArticleList } from 'entities/Article';
import { memo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { CommentList } from 'entities/Comment';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AddCommentForm } from 'features/AddCommentForm';
import { Page } from 'widgets/Page/Page';
import { VStack } from 'shared/ui/Stack';
import { articleDetailsPageReducer } from '../../model/slices';
import { fetchArticleRecommendations } from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations';
import {
  getArticleRecommendationsError,
  getArticleRecommendationsIsLoading,
} from '../../model/selectors/recommendations';
import {
  getArticleRecommendations,
} from '../../model/slices/ArticleDetailsPageRecommendationsSlice';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getArticleComments } from '../../model/slices/ArticleDetailsCommentSlice';
import cls from './ArticleDetailsPage.module.scss';
import { getArticleCommentsError, getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';

interface ArticleDetailsPageProps {
  className?: string
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
  const { t } = useTranslation('article-details');
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
  const commentsError = useSelector(getArticleCommentsError);

  const recommendations = useSelector(getArticleRecommendations.selectAll);
  const recommendationsIsLoading = useSelector(getArticleRecommendationsIsLoading);
  const recommendationsError = useSelector(getArticleRecommendationsError);

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
    dispatch(fetchArticleRecommendations());
  });

  const onSendComment = useCallback((text) => {
    dispatch(addCommentForArticle(text));
  }, [dispatch]);

  if (!id) {
    return (
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t('no-article')}
      </Page>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <VStack gap="16" max>
          <ArticleDetailsPageHeader />

          <ArticleDetails id={id} />
          <Text size={TextSize.L} title={t('Recommendations')} className={cls.recommendationsTitle} />
          <ArticleList articles={recommendations} target="_blank" isLoading={recommendationsIsLoading} className={cls.recommendations} />

          <Text size={TextSize.L} title={t('comments')} className={cls.commentTitle} />
          <AddCommentForm onSendComment={onSendComment} />
          <CommentList
            comments={comments}
            isLoading={commentsIsLoading}
          />
        </VStack>
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);

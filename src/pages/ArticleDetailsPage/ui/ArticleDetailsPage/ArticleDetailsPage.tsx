import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { ArticleDetails } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/Stack';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
import { articleDetailsPageReducer } from '../../model/slices';
import cls from './ArticleDetailsPage.module.scss';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { useArticleById } from '../../model/selectors/article';
import { Card } from '@/shared/ui/Card';
import { ToggleFeatures } from '@/shared/lib/features';
import { ArticleRating } from '@/features/articleRating';

interface ArticleDetailsPageProps {
  className?: string
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
  const { t } = useTranslation('article-details');
  const { id } = useParams();

  const article = useArticleById('1');
  console.log(article);

  if (!id) {
    return (
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t('no-article')}
      </Page>
    );
  }

  // const isArticleRatingEnabled = toggleFeatures({
  //   name: 'isArticleRatingEnabled',
  //   on: () => <ArticleRating articleId={id} />,
  //   off: () => <Card>{t('Оценка статьи скоро появится')}</Card>,
  // });

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <VStack gap="16" max>
          <ArticleDetailsPageHeader />
          <ArticleDetails id={id} />

          <ToggleFeatures
            name="isArticleRatingEnabled"
            on={<ArticleRating articleId={id} />}
            off={<Card>{t('Оценка статьи скоро появится')}</Card>}
          />
          <ArticleRecommendationsList />

          <ArticleDetailsComments id={id} />
        </VStack>
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);

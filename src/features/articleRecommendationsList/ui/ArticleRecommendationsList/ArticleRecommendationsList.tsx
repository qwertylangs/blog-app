import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';

import { VStack } from 'shared/ui/Stack';
import { ArticleList } from 'entities/Article';
import { Text, TextSize } from 'shared/ui/Text/Text';

import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';
import cls from './ArticleRecommendationsList.module.scss';

interface ArticleRecommendationsListProps {
  className?: string;
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const { data: articles, isLoading } = useArticleRecommendationsList(4);

  return (
    <VStack className={classNames('', {}, [className])}>
      <Text size={TextSize.L} title={t('Recommendations')} />
      <ArticleList articles={articles || []} target="_blank" isLoading={false} virtualized={false} />
    </VStack>
  );
});

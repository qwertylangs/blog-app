import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import { VStack } from '@/shared/ui/Stack';
import { ArticleList } from '@/entities/Article';
import { Text, TextSize } from '@/shared/ui/Text';

import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';

interface ArticleRecommendationsListProps {
  className?: string;
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const { data: articles, isLoading } = useArticleRecommendationsList(4);

  return (
    <VStack data-testid="ArticleRecommendationsList" className={classNames('', {}, [className])}>
      <Text size={TextSize.L} title={t('Recommendations')} />
      <ArticleList articles={articles || []} target="_blank" isLoading={false} />
    </VStack>
  );
});

import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RatingCard } from '@/entities/Rating';
import { useArticleRating, useRateArticle } from '../../api/articleRatingApi';
import { getUserAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/Skeleton';

interface ArticleRatingProps {
  className?: string;
  articleId: string;
}

export const ArticleRating = memo(({ className, articleId }: ArticleRatingProps) => {
  const { t } = useTranslation('article-details');

  const user = useSelector(getUserAuthData);
  const { data, isLoading } = useArticleRating({
    articleId,
    userId: user?.id ?? '',
  });
  const [rateArticle] = useRateArticle();

  const handleRateArticle = useCallback((rate: number, feedback?: string) => {
    try {
      rateArticle({
        articleId,
        userId: user?.id ?? '',
        rate,
        feedback,
      });
    } catch (error) {
      console.log(error);
    }
  }, [rateArticle, articleId, user?.id]);

  if (isLoading || !data) {
    return <Skeleton width="100%" height={150} />;
  }
  const rating = data[0];

  return (
    <RatingCard
      className={className}
      rate={rating?.rate}
      title={t('Please rate this article')}
      hasFeedback
      feedbackTitle={t('Please send your feedback')}
      onAccept={handleRateArticle}
      onCancel={handleRateArticle}
    />
  );
});

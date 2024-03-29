import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button';
import { getRouteArticleDetails, getRouteArticles } from '@/shared/const/router';
import { getArticleDetailsData } from '@/entities/Article';
import { HStack } from '@/shared/ui/Stack';
import { getCanEditArticle } from '../../model/selectors/article';

interface ArticleDetailsPageHeaderProps {
  className?: string
}

export const ArticleDetailsPageHeader = memo(({ className }: ArticleDetailsPageHeaderProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const article = useSelector(getArticleDetailsData);
  const canEdtArticle = useSelector(getCanEditArticle);

  const onBackToList = useCallback(() => {
    navigate(getRouteArticles());
  }, [navigate]);

  const onEditArticle = useCallback(() => {
    if (article?.id) {
      navigate(getRouteArticleDetails(article.id));
    }
  }, [navigate, article?.id]);

  return (
    <HStack justify="between" max className={classNames('', {}, [className])}>
      <Button onClick={onBackToList}>
        {t('back-to-articles')}
      </Button>

      {canEdtArticle && (
        <Button onClick={onEditArticle}>
          {t('Edit articles')}
        </Button>
      )}
    </HStack>
  );
});

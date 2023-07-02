import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getArticleDetailsData } from 'entities/Article';
import cls from './ArticleDetailsPageHeader.module.scss';
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
    navigate(RoutePath.articles);
  }, [navigate]);

  const onEditArticle = useCallback(() => {
    navigate(`${RoutePath.article_details}${article?.id}/edit`);
  }, [navigate, article?.id]);

  return (
    <div className={classNames(cls.articleDetailsPageHeader, {}, [className])}>
      <Button onClick={onBackToList} className={cls.backButton}>
        {t('back-to-articles')}
      </Button>

      {canEdtArticle && (
        <Button onClick={onEditArticle} className={cls.editButton}>
          {t('Edit articles')}
        </Button>
      )}
    </div>
  );
});

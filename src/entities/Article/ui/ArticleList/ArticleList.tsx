import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextSize } from '@/shared/ui/Text';
import { Article } from '../../model/types/article';
import cls from './ArticleList.module.scss';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import { ArticleView } from '../../model/consts/article';

interface ArticleListProps {
  className?: string
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className, articles, isLoading, view = ArticleView.SMALL, target,
  } = props;
  const { t } = useTranslation();

  const getSkeletons = (view: ArticleView) => {
    return (
      new Array(view === ArticleView.BIG ? 4 : 8).fill(0).map((item, index) => (
        <ArticleListItemSkeleton view={view} key={index} className={cls.article} />
      ))
    );
  };

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(cls.articleList, {}, [className, cls[view]])}>
        <Text text={t('Articles not found')} size={TextSize.L} />
      </div>
    );
  }

  return (
    <div className={classNames(cls.articleList, {}, [className, cls[view]])}>
      {articles.map((article) => (
        <ArticleListItem
          target={target}
          article={article}
          view={view}
          key={article.id}
          className={cls.article}
        />
      ))}
      {isLoading && getSkeletons(view)}
    </div>
  );
});

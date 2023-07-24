import { HTMLAttributeAnchorTarget, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { List, ListRowProps, WindowScroller } from 'react-virtualized';
import { PAGE_ID } from 'widgets/Page/Page';
import { Article, ArticleView } from '../../model/types/article';
import cls from './ArticleList.module.scss';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';

interface ArticleListProps {
  className?: string
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
  virtualized?: boolean;
}

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className, articles, isLoading, view = ArticleView.SMALL, target, virtualized = true,
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

  const isBig = view === ArticleView.BIG;
  const itemsPerRow = isBig ? 1 : 4;
  const rowCount = Math.ceil(articles.length / itemsPerRow);

  // eslint-disable-next-line react/no-unstable-nested-components
  const _rowRenderer = ({
    index, key, style,
  }: ListRowProps) => {
    const items = [];
    const fromIndex = index * itemsPerRow;
    const toIndex = Math.min(fromIndex + itemsPerRow, articles.length);

    for (let i = fromIndex; i < toIndex; i += 1) {
      items.push((
        <ArticleListItem
          target={target}
          article={articles[i]}
          view={view}
          key={articles[i].id}
          className={cls.article}
        />
      ));
    }

    return (
      <div style={style} key={key} className={cls.row}>
        {items}
      </div>
    );
  };

  return (

    <WindowScroller
      scrollElement={document.getElementById(PAGE_ID) as HTMLElement}
    >
      {({
        height, width, registerChild, isScrolling, onChildScroll, scrollTop,
      }) => (
        // @ts-ignore
        <div className={classNames(cls.articleList, {}, [className, cls[view]])} ref={registerChild}>
          {virtualized ? (
            <List
              height={height ?? 700}
              rowCount={rowCount}
              rowHeight={isBig ? 700 : 330}
              rowRenderer={_rowRenderer}
              width={width ? width - 80 : 700}
              autoHeight
              scrollTop={scrollTop}
              onScroll={onChildScroll}
              isScrolling={isScrolling}
            />
          ) : articles.map((article) => (
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
      )}

    </WindowScroller>
  );
});

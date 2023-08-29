import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Select, SelectOption } from '@/shared/ui/Select';
import { SortOrder } from '@/shared/types';
import cls from './ArticleSortSelector.module.scss';
import { ArticleSortField } from '@/entities/Article';

interface ArticleSortSelectorProps {
  order: SortOrder;
  sort: ArticleSortField;
  onChangeOrder: (order: SortOrder) => void;
  onChangeSort: (sort: ArticleSortField) => void;
  className?: string;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
  const {
    className, onChangeOrder, onChangeSort, order, sort,
  } = props;
  const { t } = useTranslation();

  const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(() => [
    {
      value: ArticleSortField.CREATED,
      content: t('created date'),
    },
    {
      value: ArticleSortField.TITLE,
      content: t('title'),
    },
    {
      value: ArticleSortField.VIEWS,
      content: t('views'),
    },
  ], [t]);

  const orderOptions = useMemo<SelectOption<SortOrder>[]>(() => [
    {
      value: 'asc',
      content: t('ascending'),
    },
    {
      value: 'desc',
      content: t('descending'),
    },
  ], [t]);

  return (
    <div className={classNames(cls.articleSortSelector, {}, [className])}>
      <Select<ArticleSortField>
        options={sortFieldOptions}
        label={t('Sort by')}
        value={sort}
        onChange={onChangeSort}
      />
      <Select
        options={orderOptions}
        label={t('By')}
        value={order}
        onChange={onChangeOrder}
      />
    </div>
  );
});

import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TabItem, Tabs } from '@/shared/ui/Tabs/Tabs';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleType } from '../../model/consts/article';

interface ArticleTypeTabsProps {
  className?: string;
  type: ArticleType;
  onChangeType: (type: TabItem<ArticleType>) => void;
}

export const ArticleTypeTabs = memo(({ className, type, onChangeType }: ArticleTypeTabsProps) => {
  const { t } = useTranslation();

  const typeTabs = useMemo<TabItem<ArticleType>[]>(() => [
    {
      value: ArticleType.ALL,
      content: t('All'),
    },
    {
      value: ArticleType.IT,
      content: t('IT'),
    },
    {
      value: ArticleType.ECONOMICS,
      content: t('Economics'),
    },
    {
      value: ArticleType.SCIENCE,
      content: t('Science'),
    },
  ], [t]);

  return (
    <Tabs
      tabs={typeTabs}
      onTabClick={onChangeType}
      value={type}
      className={classNames('', {}, [className])}
    />
  );
});

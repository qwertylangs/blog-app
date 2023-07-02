import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import cls from './ArticleEditPage.module.scss';

interface ArticleEditPageProps {
  className?: string
}

const ArticleEditPage = memo(({ className }: ArticleEditPageProps) => {
  const { t } = useTranslation();
  const { id } = useParams<{id: string}>();

  const isEdit = Boolean(id);

  return (
    <div className={classNames(cls.articleEditPage, {}, [className])}>
      {isEdit ? t('Редактирование статьи') : t('СозданиеСтатьи')}
    </div>
  );
});

export default ArticleEditPage;

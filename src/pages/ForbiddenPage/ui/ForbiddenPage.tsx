import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
// import cls from './ForbiddenPage.module.scss';

interface ForbiddenPageProps {
  className?: string
}

export const ForbiddenPage = memo(({ className }: ForbiddenPageProps) => {
  const { t } = useTranslation();
  return <div className={classNames('', {}, [className])}>{t('You dont have acess to this page')}</div>;
});

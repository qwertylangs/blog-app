import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';

interface AdminPanelPageProps {
  className?: string
}

const AdminPanelPage = memo(({ className }: AdminPanelPageProps) => {
  const { t } = useTranslation();
  return <div className={classNames('', {}, [className])}>{t('AdminPanelPage')}</div>;
});

export default AdminPanelPage;

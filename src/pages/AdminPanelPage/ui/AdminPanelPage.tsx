import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';

interface AdminPanelPageProps {
  className?: string
}

const AdminPanelPage = memo(({ className }: AdminPanelPageProps) => {
  const { t } = useTranslation();
  return <div className={classNames('', {}, [className])}>{t('AdminPanelPage')}</div>;
});

export default AdminPanelPage;

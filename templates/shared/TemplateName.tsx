import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './TemplateName.module.scss';

interface TemplateNameProps {
  className?: string
}

export const TemplateName = memo(({ className }: TemplateNameProps) => {
  const { t } = useTranslation();
  return (
    <div className={classNames(cls.templateName, {}, [className])}>
      {t('TemplateName')}
    </div>
  );
});

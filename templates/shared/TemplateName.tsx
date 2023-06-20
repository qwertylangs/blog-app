import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './TemplateName.module.scss';

interface TemplateNameProps {
  className?: string
}

export const TemplateName = ({ className }: TemplateNameProps) => {
  const { t } = useTranslation();
  return <div className={classNames(cls.TemplateName, {}, [className])}>TemplateName</div>;
};

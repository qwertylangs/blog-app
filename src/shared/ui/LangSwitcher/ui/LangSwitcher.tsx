import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';

interface LangSwitcherProps {
  className?: string
}

export const LangSwitcher = ({ className }: LangSwitcherProps) => {
  const { t, i18n } = useTranslation();
  return (
    <Button
      className={classNames('', {}, [className])}
      onClick={() => i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')}
    >
      {t('Language')}
    </Button>
  );
};

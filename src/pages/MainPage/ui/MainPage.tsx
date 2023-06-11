import { Counter } from 'entities/Counter';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const MainPage: FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      {t('Main Page')}
      <Counter />
    </div>
  );
};

export default MainPage;

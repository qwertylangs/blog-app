import { Counter } from 'entities/Counter';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input/Input';

const MainPage: FC = () => {
  const { t } = useTranslation();

  const [value, setValue] = useState('');
  const onChange = (newValue: string) => setValue(newValue);

  return (
    <div>
      {t('Main Page')}
      <Input value={value} onChange={onChange} placeholder={t('Enter text')} />
    </div>
  );
};

export default MainPage;

import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Select } from '@/shared/ui/Select/Select';
import { Listbox } from '@/shared/ui/Popups';
import { Currency } from '../../model/types/currency';

const options = [
  { value: Currency.USD, content: Currency.USD },
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.RUB, content: Currency.RUB },
];
interface CurrencySelectProps {
  className?: string
  value?: Currency
  onChange?: (value: Currency) => void
  readonly?: boolean
}

export const CurrencySelect = memo(({
  className, onChange, value, readonly,
}: CurrencySelectProps) => {
  const { t } = useTranslation();

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Currency);
  }, [onChange]);

  return (
    <Listbox
      items={options}
      defaultValue={t('Укажите валюту')}
      value={value}
      onChange={onChangeHandler}
      readonly={readonly}
      className={classNames('', {}, [className])}
      direction="top right"
      label={t('Укажите валюту')}
    />
  );
});

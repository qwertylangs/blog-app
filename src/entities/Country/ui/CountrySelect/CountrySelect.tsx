import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Select } from 'shared/ui/Select/Select';
import { memo, useCallback } from 'react';
import { Country } from '../../model/types/country';

const options = [
  { value: Country.RUSSIA, content: Country.RUSSIA },
  { value: Country.UKRAINE, content: Country.UKRAINE },
  { value: Country.BELARUS, content: Country.BELARUS },
  { value: Country.KAZAKHSTAN, content: Country.KAZAKHSTAN },
  { value: Country.ARMENIA, content: Country.ARMENIA },
];

interface CountrySelectProps {
  className?: string
  value?: Country
  onChange?: (value: Country) => void
  readonly?: boolean
}

export const CountrySelect = memo(({
  className, onChange, value, readonly,
}: CountrySelectProps) => {
  const { t } = useTranslation();

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Country);
  }, [onChange]);

  return (
    <Select
      className={classNames('', {}, [className])}
      label={t('Укажите страну')}
      options={options}
      value={value}
      onChange={onChangeHandler}
      readonly={readonly}
    />
  );
});

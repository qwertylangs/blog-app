import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Currency, CurrencySelect } from 'entities/Currency';
import { CountrySelect } from 'entities/Country/ui/CountrySelect/CountrySelect';
import { Country } from 'entities/Country';
import { HStack, VStack } from 'shared/ui/Stack';
import cls from './ProfileCard.module.scss';
import { Profile } from '../../model/types/profile';

interface ProfileCardProps {
  className?: string
  data?: Profile
  isLoading?: boolean
  error?: string
  readonly?: boolean
  onChangeFirstname?: (value: string) => void
  onChangeLastname?: (value: string) => void
  onChangeCity?: (value: string) => void
  onChangeAge?: (value: string) => void
  onChangeUsername?: (value: string) => void
  onChangeAvatar?: (value: string) => void
  onChangeCurrency?: (value: Currency) => void
  onChangeCountry?: (value: Country) => void
}

export const ProfileCard = (props: ProfileCardProps) => {
  const {
    className,
    data,
    error,
    isLoading,
    readonly,
    onChangeFirstname,
    onChangeLastname,
    onChangeAge,
    onChangeCity,
    onChangeUsername,
    onChangeAvatar,
    onChangeCurrency,
    onChangeCountry,
  } = props;
  const { t } = useTranslation('profile');

  if (isLoading) {
    return (
      <HStack max justify="center" className={classNames(cls.ProfileCard, {}, [className])}>
        <Loader />
      </HStack>
    );
  }

  if (error) {
    return (
      <HStack max justify="center" className={classNames(cls.ProfileCard, {}, [className])}>
        <Text
          theme={TextTheme.ERROR}
          title={t('Ошибка при загрузке профиля')}
          text={t('Попробуйте обновить страницу')}
          align={TextAlign.CENTER}
        />
      </HStack>
    );
  }

  const mods = {
    [cls.editing]: !readonly,
  };

  return (
    <VStack max gap="16" className={classNames(cls.ProfileCard, mods, [className])}>
      {data?.avatar && (
        <HStack max justify="center">
          <Avatar src={data?.avatar} size={100} />
        </HStack>
      )}

      <Input
        value={data?.first}
        placeholder={t('Ваше имя')}
        className={cls.input}
        onChange={onChangeFirstname}
        readonly={readonly}
      />

      <Input
        value={data?.lastname}
        placeholder={t('Ваша фамилия')}
        className={cls.input}
        onChange={onChangeLastname}
        readonly={readonly}
      />

      <Input
        value={data?.age}
        placeholder={t('Ваш возраст')}
        className={cls.input}
        onChange={onChangeAge}
        readonly={readonly}
      />

      <Input
        value={data?.city}
        placeholder={t('Город')}
        className={cls.input}
        onChange={onChangeCity}
        readonly={readonly}
      />

      <Input
        value={data?.username}
        placeholder={t('Введите имя пользователя')}
        className={cls.input}
        onChange={onChangeUsername}
        readonly={readonly}
      />

      <Input
        value={data?.avatar}
        placeholder={t('Введите ссылку на аватар')}
        className={cls.input}
        onChange={onChangeAvatar}
        readonly={readonly}
      />

      <CurrencySelect
        className={cls.input}
        value={data?.currency}
        onChange={onChangeCurrency}
        readonly={readonly}
      />

      <CountrySelect
        className={cls.input}
        value={data?.country}
        onChange={onChangeCountry}
        readonly={readonly}
      />
    </VStack>
  );
};

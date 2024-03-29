import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Dropdown } from '@/shared/ui/Popups';
import { getRouteAdminPanel, getRouteProfile } from '@/shared/const/router';
import {
  getUserAuthData, isUserAdmin, isUserManager, useUserActions,
} from '@/entities/User';
import { Avatar } from '@/shared/ui/Avatar';
import cls from './AvatarDropdown.module.scss';

interface AvatarDropdownProps {
  className?: string;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
  const { className } = props;
  const { t } = useTranslation();

  const authData = useSelector(getUserAuthData);
  const { logout } = useUserActions();

  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);

  const isAdminAvailable = isAdmin || isManager;

  const onLogout = useCallback(() => {
    logout();
  }, [logout]);

  if (!authData) {
    return null;
  }

  return (
    <Dropdown
      className={classNames(cls.AvatarDropdown, {}, [className])}
      items={[
        ...(isAdminAvailable ? [{
          content: t('Admin panel'),
          href: getRouteAdminPanel(),
        }] : []),
        {
          content: t('User profile'),
          href: getRouteProfile(authData.id),
        },
        {
          content: t('Выйти'),
          onClick: onLogout,
        }]}
      trigger={<Avatar fallbackInverted size={30} src={authData.avatar} alt={authData.username} />}
      direction="bottom left"
    />
  );
});

import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { useNotifications } from '../../api/notificationApi';
import cls from './NotificationList.module.scss';
import { NotificationItem } from '../NotificationItem/NotificationItem';

interface NotificationListProps {
  className?: string
}

export const NotificationList = memo(({ className }: NotificationListProps) => {
  const { data, isLoading } = useNotifications(null, {
    pollingInterval: 5000,
  });

  if (isLoading) {
    return (
      <VStack gap="16" max className={classNames(cls.notificationList, {}, [className])}>
        <Skeleton width="100%" height={80} border="8px" />
        <Skeleton width="100%" height={80} border="8px" />
        <Skeleton width="100%" height={80} border="8px" />
      </VStack>
    );
  }

  return (
    <VStack gap="16" max className={classNames(cls.notificationList, {}, [className])}>
      {data?.map((notification) => (
        <NotificationItem key={notification.id} item={notification} />
      ))}
    </VStack>
  );
});

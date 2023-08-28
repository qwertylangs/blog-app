import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card, CardTheme } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';
import cls from './NotificationItem.module.scss';
import { Notification } from '../../model/types/notification';

interface NotificationItemProps {
  className?: string
  item: Notification
}

export const NotificationItem = memo(({ className, item }: NotificationItemProps) => {
  const content = (
    <Card theme={CardTheme.OUTLINED} className={classNames(cls.notificationItem, {}, [className])}>
      <Text title={item.title} text={item.description} className={cls.text} />
    </Card>
  );

  if (item.href) {
    return (
      <a href={item.href} target="_blank" rel="noreferrer" style={{ display: 'block', width: '100%' }}>
        {content}
      </a>
    );
  }

  return content;
});

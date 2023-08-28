import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Popover } from '@/shared/ui/Popups';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { NotificationList } from '@/entities/Notification';
import NotificationIcon from '@/shared/assets/icons/notification-20-20.svg';
import { Drawer } from '@/shared/ui/Drawer';
import { AnimationProvider } from '@/shared/lib/components/AnimationProvider';
import cls from './NotificationButton.module.scss';

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
  const { className } = props;
  const [isDrawer, setIsDrawer] = useState(false);

  const onCloseDrawer = useCallback(() => {
    setIsDrawer(false);
  }, []);

  const onShowDrawer = useCallback(() => {
    setIsDrawer(true);
  }, []);

  const trigger = (
    <Button theme={ButtonTheme.CLEAR} onClick={onShowDrawer}>
      <Icon Svg={NotificationIcon} inverted />
    </Button>
  );

  return (
    <>
      <BrowserView>
        <Popover
          className={classNames(cls.NotificationButton, {}, [className])}
          direction="bottom left"
          trigger={trigger}
        >
          <NotificationList className={cls.notifications} />
        </Popover>
      </BrowserView>

      <MobileView>
        {trigger}
        <AnimationProvider>
          <Drawer isOpen={isDrawer} onClose={onCloseDrawer}>
            <NotificationList className={cls.notificationsMobile} />
          </Drawer>
        </AnimationProvider>
      </MobileView>
    </>
  );
});

import { ReactNode, memo } from 'react';
import { Popover as HPopover } from '@headlessui/react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import { mapDirectionClass } from '../../styles/consts';
import cls from './Popover.module.scss';
import popupCls from '../../styles/Popups.module.scss';

interface PopoverProps {
  className?: string;
  trigger: ReactNode;
  direction?: DropdownDirection;
  children: ReactNode;
}

export const Popover = memo((props: PopoverProps) => {
  const {
    trigger, className, direction = 'bottom right', children,
  } = props;

  const clsDirection = mapDirectionClass[direction];

  return (
    <HPopover className={classNames(cls.popover, {}, [className, popupCls.popup])}>
      <HPopover.Button className={popupCls.trigger}>
        {trigger}
      </HPopover.Button>

      <HPopover.Panel className={classNames(cls.panel, {}, [clsDirection])}>
        {children}
      </HPopover.Panel>
    </HPopover>
  );
});

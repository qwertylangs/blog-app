import { Menu, Transition } from '@headlessui/react';
import {
  Fragment, ReactNode, useEffect, useRef, useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { DropdownDirection } from 'shared/types/ui';
import cls from './Dropdown.module.scss';
import { AppLink } from '../AppLink/AppLink';

export interface DropdownItem {
  content: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
}

interface DropdownProps {
  className?: string;
  trigger: ReactNode;
  items: DropdownItem[];
  direction?: DropdownDirection;
}

const mapDirectionClass: Record<DropdownDirection, string> = {
  'top left': cls.optionsTopLeft,
  'top right': cls.optionsTopRight,
  'bottom left': cls.optionsBottomLeft,
  'bottom right': cls.optionsBottomRight,
};

export const Dropdown = (props: DropdownProps) => {
  const {
    items, trigger, className, direction = 'bottom right',
  } = props;

  return (
    <Menu as="div" className={classNames(cls.menu, {}, [className])}>
      <Menu.Button className={cls.btn}>
        {trigger}
      </Menu.Button>

      <Menu.Items className={classNames(cls.items, {}, [mapDirectionClass[direction]])}>
        {items.map((item, i) => {
          const content = ({ active }: { active: boolean }) => (
            <button
              onClick={item.onClick}
              type="button"
              className={classNames(cls.item, { [cls.active]: active })}
            >
              {item.content}
            </button>
          );

          if (item.href) {
            return (
              <Menu.Item as={AppLink} to={item.href} disabled={item.disabled}>
                {content}
              </Menu.Item>
            );
          }

          return (
            <Menu.Item as={Fragment} disabled={item.disabled} key={i}>
              {content}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

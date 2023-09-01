import {
  memo, Fragment, ReactNode,
} from 'react';
import { Listbox as HListbox } from '@headlessui/react';
import { classNames } from '@/shared/lib/classNames/classNames';

import { DropdownDirection } from '@/shared/types/ui';
import cls from './Listbox.module.scss';
import { Button } from '../../../Button/Button';
import { HStack } from '../../../Stack';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/Popups.module.scss';

export interface ListboxItem {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}
interface ListboxProps {
  items: ListboxItem[];
  className?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  readonly?: boolean;
  direction?: DropdownDirection;
  label?: string;
}

export const Listbox = memo((props: ListboxProps) => {
  const {
    className, items, value, defaultValue, onChange, readonly, direction = 'bottom right', label,
  } = props;

  return (
    <HStack gap="8">
      {label && <span>{`${label}>`}</span>}
      <HListbox
        as="div"
        value={value}
        onChange={onChange}
        className={classNames('', {}, [className, popupCls.popup])}
        disabled={readonly}
      >
        <div>
          <HListbox.Button className={cls.trigger} as="div">
            <Button disabled={readonly}>
              {value ?? defaultValue}
            </Button>
          </HListbox.Button>

          <HListbox.Options className={classNames(cls.options, {}, [mapDirectionClass[direction]])}>
            {items.map((item, i) => (
              <HListbox.Option
                key={i}
                value={item.value}
                as={Fragment}
                disabled={item.disabled}
              >
                {({ selected, active }) => (
                  <div>
                    <li
                      className={classNames(cls.option, { [cls.active]: active, [cls.disabled]: item.disabled })}
                    >
                      {selected && '!!!'}
                      {item.content}
                    </li>
                  </div>
                ) }
              </HListbox.Option>
            ))}
          </HListbox.Options>
        </div>
      </HListbox>
    </HStack>
  );
});

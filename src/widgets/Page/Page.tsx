import {
  MutableRefObject, memo, useRef, UIEvent,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useInfinityScroll } from 'shared/lib/hooks/useInfinityScroll/useInfinityScroll';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { UIActions, getUIScrollByPath } from 'features/UI';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StateSchema } from 'app/providers/StoreProvider';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useThrottle } from 'shared/lib/hooks/useThrottle/useThrottle';
import cls from './Page.module.scss';

interface PageProps {
  className?: string;
  children: React.ReactNode;
  onScrollEnd?: () => void;
}

export const Page = memo(({ className, children, onScrollEnd }: PageProps) => {
  const wrapperRef = useRef() as MutableRefObject<HTMLElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const scrollPosition = useSelector((state: StateSchema) => getUIScrollByPath(state, pathname));

  useInfinityScroll({
    triggerRef,
    wrapperRef,
    callback: () => {
      onScrollEnd?.();
    },
  });

  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition;
  });
  const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
    dispatch(UIActions.setScrollPosition({
      path: pathname,
      position: e.currentTarget.scrollTop,
    }));
  }, 500);

  return (
    <section
      ref={wrapperRef}
      className={classNames(cls.page, {}, [className])}
      onScroll={onScroll}
    >
      {children}
      <div ref={triggerRef} style={{ marginBottom: '40px' }} />
    </section>
  );
});

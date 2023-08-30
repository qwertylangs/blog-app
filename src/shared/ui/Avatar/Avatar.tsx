import { CSSProperties, memo, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';
import UserIcon from '../../assets/icons/user-filled.svg';
import { AppImage } from '../AppImage';
import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';

interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
  fallbackInverted?: boolean;
}

export const Avatar = memo(({
  className, src, size, alt, fallbackInverted,
}: AvatarProps) => {
  const mods = {};
  const style = useMemo<CSSProperties>(() => ({
    width: size || 100,
    height: size || 100,
  }), [size]);

  const errorFallback = <Icon inverted={fallbackInverted} width={size} height={size} Svg={UserIcon} />;

  return (
    <AppImage
      fallback={<Skeleton width={size} height={size} border="50%" />}
      errorFallback={errorFallback}
      src={src}
      alt={alt || 'avatar'}
      className={classNames(cls.Avatar, mods, [className])}
      style={style}
    />
  );
});

import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './Text.module.scss';

export enum TextTheme {
  PRIMARY = 'primary',
  INVERTED = 'inverted',
  ERROR = 'error',
}

export enum TextAlign {
  RIGHT = 'right',
  LEFT = 'left',
  CENTER = 'center',
}

export enum TextSize {
  M = 'size_m',
  L = 'size_l',
}

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
  align?: TextAlign;
  size?: TextSize;

  dataTestId?: string;
}

export const Text = memo((props: TextProps) => {
  const {
    className,
    text,
    title,
    theme = TextTheme.PRIMARY,
    align = TextAlign.LEFT,
    size = TextSize.M,
    dataTestId = 'Text',
  } = props;

  return (
    <div className={classNames(cls.Text, { }, [className, cls[theme], cls[align], cls[size]])}>
      {title && <p className={cls.title} data-testid={`${dataTestId}.Header`}>{title}</p>}
      {text && <p className={cls.text} data-testid={`${dataTestId}.Paragraph`}>{text}</p>}
    </div>
  );
});

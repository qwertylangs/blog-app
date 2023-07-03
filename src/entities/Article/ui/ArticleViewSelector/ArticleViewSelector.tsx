import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import TiledIcon from 'shared/assets/icons/tiled-24-24.svg';
import ListIcon from 'shared/assets/icons/list-24-24.svg';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import { ArticleView } from '../../model/types/article';
import cls from './ArticleViewSelector.module.scss';

interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleView;
  onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.SMALL,
    icon: TiledIcon,
  },
  {
    view: ArticleView.BIG,
    icon: ListIcon,
  },
];

export const ArticleViewSelector = memo(({ className, view, onViewClick }: ArticleViewSelectorProps) => {
  const onClick = (view: ArticleView) => {
    return () => {
      onViewClick?.(view);
    };
  };

  return (
    <div className={classNames(cls.articleViewSelector, {}, [className])}>
      {
        viewTypes.map((viewType, i) => (
          <Button
            key={i}
            theme={ButtonTheme.CLEAR}
            onClick={onClick(viewType.view)}
          >
            <Icon
              Svg={viewType.icon}
              className={classNames('', { [cls.notSelected]: viewType.view !== view })}
            />
          </Button>
        ))
      }
    </div>
  );
});

import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './StarRating.module.scss';
import StarIcon from '@/shared/assets/icons/star.svg';
import { Icon } from '../Icon/Icon';

interface StarRatingProps {
  className?: string;
  selectedStars?: number;
  onSelect?: (selectedStars: number) => void;
  size?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = memo(({
  className, onSelect, selectedStars = 0, size = 30,
}: StarRatingProps) => {
  const [isSelected, setIsSelected] = useState(Boolean(selectedStars));
  const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);

  const onHover = (starsCount: number) => () => {
    if (!isSelected) {
      setCurrentStarsCount(starsCount);
    }
  };

  const onLeave = () => {
    if (!isSelected) {
      setCurrentStarsCount(0);
    }
  };

  const onClick = (starsCount: number) => () => {
    if (!isSelected) {
      setIsSelected(true);
      setCurrentStarsCount(starsCount);
      onSelect?.(starsCount);
    }
  };

  return (
    <div className={classNames(cls.starRating, {}, [className])}>
      {stars.map((starNumber) => (
        <Icon
          Svg={StarIcon}
          key={starNumber}
          className={classNames(currentStarsCount >= starNumber ? cls.hovered : cls.clear, { [cls.selected]: isSelected }, [cls.starIcon])}
          width={size}
          height={size}
          onMouseEnter={onHover(starNumber)}
          onMouseLeave={onLeave}
          onClick={onClick(starNumber)}
        />
      ))}
    </div>
  );
});

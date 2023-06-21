import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import cls from './ArticleImageBlockComponent.module.scss';
import { ArticleImageBlock } from '../../model/types/article';

interface ArticleImageBlockComponentProps {
  className?: string
  block: ArticleImageBlock
}

export const ArticleImageBlockComponent = ({ className, block }: ArticleImageBlockComponentProps) => {
  const { t } = useTranslation();
  return (
    <div className={classNames(cls.articleImageBlockComponent, {}, [className])}>
      <img src={block.src} className={cls.img} alt={block.title} />
      {block.title && (
        <Text text={block.title} align={TextAlign.CENTER} />
      )}
    </div>
  );
};

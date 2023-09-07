import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import { Icon } from '@/shared/ui/Icon';
import { Card } from '@/shared/ui/Card';
import { Avatar } from '@/shared/ui/Avatar';
import { Button } from '@/shared/ui/Button';
import { getRouteArticleDetails } from '@/shared/const/router';
import { AppLink } from '@/shared/ui/AppLink';
import cls from './ArticleListItem.module.scss';
import {
  Article, ArticleTextBlock,
} from '../../model/types/article';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { ArticleView, ArticleBlockType } from '../../model/consts/article';
import { AppImage } from '@/shared/ui/AppImage';
import { Skeleton } from '@/shared/ui/Skeleton';

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo(({
  className, article, view, target,
}: ArticleListItemProps) => {
  const { t } = useTranslation();

  const types = <Text text={article.type.join(', ')} className={cls.types} />;
  const views = (
    <>
      <Text text={String(article.views)} className={cls.views} />
      <Icon Svg={EyeIcon} className={cls.eyeIcon} />
    </>
  );

  const createdAt = <Text text={article.createdAt} className={cls.date} />;
  const title = <Text text={article.title} className={cls.title} />;

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find((block) => block.type === ArticleBlockType.TEXT) as ArticleTextBlock;

    return (
      <div data-testid="ArticleListItem" className={classNames(cls.articleListItem, {}, [className, cls[view]])}>
        <Card className={cls.card}>
          <div className={cls.header}>
            <Avatar size={30} src={article.user.avatar} className={cls.avatar} />
            <Text text={article.user.username} className={cls.username} />
            {createdAt}
          </div>

          {title}
          {types}
          <AppImage
            fallback={<Skeleton height={250} width="100%" />}
            src={article.img}
            alt={article.title}
            className={cls.image}
          />
          {textBlock && <ArticleTextBlockComponent block={textBlock} className={cls.textBlock} />}

          <div className={cls.footer}>
            <AppLink target={target} to={getRouteArticleDetails(article.id)} className={cls.link}>
              <Button>
                {t('read-more')}
              </Button>
            </AppLink>
            {views}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <AppLink
      data-testid="ArticleListItem"
      target={target}
      to={getRouteArticleDetails(article.id)}
      className={classNames(cls.articleListItem, {}, [className, cls[view]])}
    >
      <Card className={cls.card}>
        <div className={cls.imageWrapper}>
          <AppImage
            fallback={<Skeleton height={200} width={200} />}
            src={article.img}
            alt={article.title}
            className={cls.image}
          />
          {createdAt}
        </div>

        <div className={cls.infoWrapper}>
          {types}
          {views}
        </div>
        {title}
      </Card>
    </AppLink>
  );
});

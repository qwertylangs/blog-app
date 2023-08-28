import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import { Icon } from '@/shared/ui/Icon';
import { Card } from '@/shared/ui/Card';
import { Avatar } from '@/shared/ui/Avatar';
import { Button } from '@/shared/ui/Button';
import { RoutePath } from '@/shared/const/router';
import { AppLink } from '@/shared/ui/AppLink';
import cls from './ArticleListItem.module.scss';
import {
  Article, ArticleTextBlock,
} from '../../model/types/article';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { ArticleView, ArticleBlockType } from '../../model/consts/article';

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
  const articleImg = <img src={article.img} alt={article.title} className={cls.image} />;
  const createdAt = <Text text={article.createdAt} className={cls.date} />;
  const title = <Text text={article.title} className={cls.title} />;

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find((block) => block.type === ArticleBlockType.TEXT) as ArticleTextBlock;

    return (
      <div className={classNames(cls.articleListItem, {}, [className, cls[view]])}>
        <Card className={cls.card}>
          <div className={cls.header}>
            <Avatar size={30} src={article.user.avatar} className={cls.avatar} />
            <Text text={article.user.username} className={cls.username} />
            {createdAt}
          </div>

          {title}
          {types}
          {articleImg}
          {textBlock && <ArticleTextBlockComponent block={textBlock} className={cls.textBlock} />}

          <div className={cls.footer}>
            <AppLink target={target} to={RoutePath.article_details + article.id} className={cls.link}>
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
      target={target}
      to={RoutePath.article_details + article.id}
      className={classNames(cls.articleListItem, {}, [className, cls[view]])}
    >
      <Card className={cls.card}>
        <div className={cls.imageWrapper}>
          {articleImg}
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

import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text/Text';
import cls from './CommentList.module.scss';
import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';

interface CommentListProps {
  className?: string;
  comments: Comment[];
  isLoading?: boolean;
}

export const CommentList = memo(({ className, comments, isLoading }: CommentListProps) => {
  const { t } = useTranslation();
  return (
    <div className={classNames(cls.commentList, {}, [className])}>
      {comments.length ? (
        comments.map((comment) => (
          <CommentCard comment={comment} isLoading={isLoading} key={comment.id} />
        )))
        : <Text text={t('no-comments')} />}
    </div>
  );
});

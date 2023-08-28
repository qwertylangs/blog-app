import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RatingCard } from '@/entities/Rating';
import { getUserAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/Skeleton';
import { useProfileRating, useRateProfile } from '../../api/profileRatingApi';
import cls from './ProfileRating.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface ProfileRatingProps {
  className?: string;
  profileId: string;
}

export const ProfileRating = memo(({ className, profileId }: ProfileRatingProps) => {
  const { t } = useTranslation('profile');

  const user = useSelector(getUserAuthData);
  const { data, isLoading } = useProfileRating({
    profileId,
    userId: user?.id ?? '',
  });
  const [rateProfile] = useRateProfile();

  const handleRateProfile = useCallback((rate: number, feedback?: string) => {
    try {
      rateProfile({
        profileId,
        userId: user?.id ?? '',
        rate,
        feedback,
      });
    } catch (error) {
      console.log(error);
    }
  }, [rateProfile, profileId, user?.id]);

  if (isLoading || !data) {
    return <Skeleton width="100%" height={150} className={cls.profileRating} border="10px" />;
  }
  const rating = data[0];

  return (
    <RatingCard
      className={classNames(cls.profileRating, {}, [className])}
      rate={rating?.rate}
      title={t('Please rate this profile')}
      hasFeedback
      feedbackTitle={t('Please send your feedback')}
      onAccept={handleRateProfile}
      onCancel={handleRateProfile}
    />
  );
});

import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { EditableProfileCard } from '@/features/editableProfileCard';
import { Page } from '@/widgets/Page';
import { Text, TextTheme } from '@/shared/ui/Text';
import { ProfileRating } from '@/features/profileRating';

interface ProfilePageProps {
  className?: string
}

const ProfilePage = ({ className }: ProfilePageProps) => {
  const { id } = useParams<{id: string}>();
  const { t } = useTranslation('profile');

  if (!id) {
    return <Text title={t('Profile not found')} theme={TextTheme.ERROR} />;
  }

  return (
    <Page className={classNames('', {}, [className])}>
      <EditableProfileCard id={id} />
      <ProfileRating profileId={id} />
    </Page>
  );
};

export default ProfilePage;

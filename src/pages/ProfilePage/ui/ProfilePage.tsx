import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { VStack } from 'shared/ui/Stack';
import { EditableProfileCard } from 'features/editableProfileCard';
import { Page } from 'widgets/Page/Page';
import { useParams } from 'react-router-dom';
import { Text, TextTheme } from 'shared/ui/Text/Text';

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
    </Page>
  );
};

export default ProfilePage;

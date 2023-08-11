import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page/Page';

const AboutPage = () => {
  const { t } = useTranslation('about');

  return (
    <Page>
      {t('o-saite')}
    </Page>
  );
};

export default AboutPage;

import { useTranslation } from 'react-i18next';
import {
  memo, useCallback, useEffect, useState,
} from 'react';
import { isMobile } from 'react-device-detect';
import { Modal } from '@/shared/ui/Modal';
import { saveJsonSettings, useJsonSettings } from '@/entities/User';
import { Text } from '@/shared/ui/Text';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Drawer } from '@/shared/ui/Drawer';

export const ArticlesPageGreeting = memo(() => {
  const { t } = useTranslation('article-details');
  const [isOpen, setIsOpen] = useState(false);
  const { isArticlesPageWasVisited } = useJsonSettings();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isArticlesPageWasVisited) {
      setIsOpen(true);
      dispatch(saveJsonSettings({ isArticlesPageWasVisited: true }));
    }
  }, [isArticlesPageWasVisited, dispatch]);

  const handleCloseModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const text = <Text title={t('Welcome to articles page')} text={t('You can view and rate the article')} />;

  if (isMobile) {
    return (
      <Drawer isOpen={isOpen} onClose={handleCloseModal}>
        {text}
      </Drawer>
    );
  }

  return (
    <Modal lazy isOpen={isOpen} onClose={handleCloseModal}>
      {text}
    </Modal>
  );
});

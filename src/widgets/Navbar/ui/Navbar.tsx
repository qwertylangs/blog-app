import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { useCallback, useState } from 'react';
import { on } from 'stream';
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);

  const onToggleModal = useCallback(() => {
    setIsAuthModal((prev) => !prev);
  }, []);

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <Button
        theme={ButtonTheme.CLEAR_INVERTED}
        size={ButtonSize.M}
        className={cls.links}
        onClick={onToggleModal}
      >
        {t('Войти')}
      </Button>
      <Modal isOpen={isAuthModal} onClose={onToggleModal}>
        {/* eslint-disable */}
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias aliquam blanditiis ipsa, eveniet suscipit eos voluptatum asperiores error modi earum omnis, praesentium officia quae molestiae quidem dolor. Culpa, hic deserunt.
      </Modal>
    </div>
  );
};

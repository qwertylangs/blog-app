import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { HStack } from '@/shared/ui/Stack';
import { addCommentFormActions, addCommentFormReducer } from '../../model/slice/addCommentFormSlice';
import { getAddCommentFormError, getAddCommentFormText } from '../../model/selectors/addCommentFormSelectors';
import cls from './AddCommentForm.module.scss';

export interface AddCommentFormProps {
  className?: string
  onSendComment: (text: string) => void
}

const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer,
};

const AddCommentForm = memo(({ className, onSendComment }: AddCommentFormProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const text = useSelector(getAddCommentFormText);
  const error = useSelector(getAddCommentFormError);

  const onCommentTextChange = useCallback((value: string) => {
    dispatch(addCommentFormActions.setText(value));
  }, [dispatch]);

  const onSendHandler = useCallback(() => {
    if (text) {
      onSendComment(text);
      dispatch(addCommentFormActions.setText(''));
    }
  }, [dispatch, onSendComment, text]);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <HStack justify="between" max className={classNames(cls.addCommentForm, {}, [className])} data-testid="AddCommentForm">
        <Input
          className={cls.input}
          placeholder={t('enter-comment-text')}
          value={text}
          onChange={onCommentTextChange}
          data-testid="AddCommentForm.Input"
        />
        <Button onClick={onSendHandler} className={cls.sendBtn} disabled={!text} data-testid="AddCommentForm.Button">
          {t('send')}
        </Button>
      </HStack>
    </DynamicModuleLoader>
  );
});

export default AddCommentForm;

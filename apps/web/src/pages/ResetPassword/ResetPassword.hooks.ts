import { matches, matchesField, type TransformedValues, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import type { TFunction } from 'i18next';
import { useCallback, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { REGEXPS } from '../../constants/regexp';
import { authClient } from '../../lib/auth-client';
import { routes } from '../../router';

interface ResetPasswordHooksInputProps {
  t: TFunction;
}

export const useResetPasswordHooks = ({ t }: ResetPasswordHooksInputProps) => {
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const token = search.get('token');

  const [resetLoading, setResetLoading] = useState(false);
  const [visiblePassword, { toggle: toggleVisiblePassword }] = useDisclosure(false);

  const resetPasswordForm = useForm({
    mode: 'uncontrolled',
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validateInputOnBlur: true,
    validate: {
      password: matches(REGEXPS.PASSWORD, t('errors.passwordRegexp')),
      confirmPassword: matchesField('password', t('errors.confirmPassword')),
    },
    transformValues: ({ password }) => ({ password }),
  });

  const handleSendResetPassword = useCallback(
    async ({ password }: TransformedValues<typeof resetPasswordForm>) => {
      if (token) {
        setResetLoading(true);
        await authClient.resetPassword(
          {
            newPassword: password,
            token,
          },
          {
            onResponse: () => setResetLoading(false),
            onSuccess: async () => {
              notifications.show({
                message: t('resetPassword.success'),
                color: 'green',
              });
              navigate(routes.login);
            },
            onError: ({ error }) => {
              notifications.show({
                title: error.code,
                message: error.message,
                color: 'red',
              });
            },
          }
        );
      } else {
        notifications.show({
          title: t('common:error'),
          message: 'Invalid token',
          color: 'red',
        });
      }
    },
    [t, token, navigate]
  );

  return {
    resetPasswordForm,
    visiblePassword,
    resetLoading,
    toggleVisiblePassword,
    handleSendResetPassword,
  };
};

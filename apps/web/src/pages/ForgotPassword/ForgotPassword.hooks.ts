import { isEmail, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import type { TFunction } from 'i18next';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';

import { authClient } from '../../lib/auth-client';
import { useSession } from '../../lib/useSession';
import { routes } from '../../router';

interface ForgotPasswordHooksInputProps {
  t: TFunction;
}

type ForgotPasswordFormValues = {
  email: string;
};

export const useForgotPasswordHooks = ({ t }: ForgotPasswordHooksInputProps) => {
  const navigate = useNavigate();
  const { session } = useSession();

  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const forgotPasswordForm = useForm<ForgotPasswordFormValues>({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
    },
    validateInputOnBlur: true,
    validate: {
      email: isEmail(t('errors.emailInvalid')),
    },
  });

  const handleSendForgotPassword = useCallback(
    async ({ email }: ForgotPasswordFormValues) => {
      setForgotPasswordLoading(true);
      await authClient.requestPasswordReset(
        {
          email,
          redirectTo: `${window.location.origin}${routes.resetPassword}`,
        },
        {
          onResponse: () => setForgotPasswordLoading(false),
          onSuccess: async () => {
            if (session) {
              await authClient.revokeSessions();
              await authClient.signOut();
            }
            notifications.show({
              title: t('common:settings.account.emailResetTitle'),
              message: t('common:settings.account.emailResetMessage'),
              color: 'green',
            });
            navigate(routes.login);
          },
        }
      );
    },
    [t, navigate, session]
  );

  return {
    forgotPasswordForm,
    forgotPasswordLoading,
    handleSendForgotPassword,
  };
};

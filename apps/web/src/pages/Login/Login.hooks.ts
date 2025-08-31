import { isEmail, matches, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import type { TFunction } from 'i18next';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';

import { REGEXPS } from '../../constants/regexp';
import { authClient } from '../../lib/auth-client';
import { routes } from '../../router';

type LoginFormValues = {
  email: string;
  password: string;
};

interface LoginHooksInputProps {
  t: TFunction;
}

export const useLoginHooks = ({ t }: LoginHooksInputProps) => {
  const navigate = useNavigate();

  const [loginLoading, setLoginLoading] = useState(false);

  const loginForm = useForm<LoginFormValues>({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },
    validateInputOnBlur: true,
    validate: {
      email: isEmail(t('errors.emailInvalid')),
      password: matches(REGEXPS.PASSWORD, t('errors.passwordInvalid')),
    },
  });

  const handleLogin = useCallback(
    async (values: LoginFormValues) => {
      setLoginLoading(true);
      await authClient.signIn.email(values, {
        onSuccess: () => navigate(routes.home),
        onError: ({ error }) => {
          notifications.show({
            title: t('common:error'),
            message: error.message,
            color: 'red',
          });
        },
        onResponse: () => setLoginLoading(false),
      });
    },
    [navigate, t]
  );

  return {
    loginForm,
    loginLoading,
    handleLogin,
  };
};

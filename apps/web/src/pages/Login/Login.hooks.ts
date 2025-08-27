import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';

import { authClient } from '../../lib/auth-client';
import { routes } from '../../router';

type LoginFormValues = {
  email: string;
  password: string;
};

export const useLoginHooks = () => {
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
      email: (value) => (value.length > 0 ? null : "L'email est obligatoire"),
      password: (value) => (value.length > 0 ? null : 'Mot de passe obligatoire'),
    },
  });

  const handleLogin = useCallback(
    async (values: LoginFormValues) => {
      setLoginLoading(true);
      await authClient.signIn.email(values, {
        onSuccess: () => navigate(routes.home),
        onError: ({ error }) => {
          notifications.show({
            title: 'Erreur',
            message: error.message,
            color: 'red',
          });
        },
        onResponse: () => setLoginLoading(false),
      });
    },
    [navigate]
  );

  return {
    loginForm,
    loginLoading,
    handleLogin,
  };
};

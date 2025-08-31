import { hasLength, isEmail, matches, matchesField, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import type { TFunction } from 'i18next';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';

import { REGEXPS } from '../../constants/regexp';
import { authClient } from '../../lib/auth-client';
import { routes } from '../../router';

type SignUpFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

interface SignUpHooksInputProps {
  t: TFunction;
}

export const useSignUpHooks = ({ t }: SignUpHooksInputProps) => {
  const navigate = useNavigate();

  const [registerLoading, setRegisterLoading] = useState(false);

  const registerForm = useForm<SignUpFormValues>({
    mode: 'uncontrolled',
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validateInputOnBlur: true,
    validate: {
      firstName: hasLength({ min: 2 }, t('errors.firstName')),
      lastName: hasLength({ min: 2 }, t('errors.lastName')),
      email: isEmail(t('errors.emailInvalid')),
      password: matches(REGEXPS.PASSWORD, 'errors.passwordRegexp'),
      confirmPassword: matchesField('password', t('errors.confirmPassword')),
    },
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: no Mantine form object in dependencies
  const handleRegister = useCallback(
    async (values: Omit<SignUpFormValues, 'confirmPassword'>) => {
      setRegisterLoading(true);
      await authClient.signUp.email(
        {
          email: values.email,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
          name: `${values.firstName} ${values.lastName}`,
        },
        {
          onSuccess: () => navigate(routes.home),
          onError: ({ error }) => {
            console.log({ error });
            if (error.code === authClient.$ERROR_CODES.USER_ALREADY_EXISTS) {
              registerForm.setFieldError('email', error.message);
            } else {
              notifications.show({
                title: t('common:error'),
                message: error.message,
                color: 'red',
              });
            }
          },
          onResponse: () => setRegisterLoading(false),
        }
      );
    },
    [navigate, t]
  );

  return {
    registerForm,
    registerLoading,
    handleRegister,
  };
};

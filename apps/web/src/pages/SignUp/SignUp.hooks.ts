import { hasLength, isEmail, matchesField, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';

import { authClient } from '../../lib/auth-client';
import { routes } from '../../router';

type SignUpFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const useSignUpHooks = () => {
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
      firstName: hasLength({ min: 2 }, 'Le prénom doit contenir au moins 2 caractères'),
      lastName: hasLength({ min: 2 }, 'Le nom doit contenir au moins 2 caractères'),
      email: isEmail('Email invalides'),
      password: (value) => (value.length > 0 ? null : 'Mot de passe est requis'),
      confirmPassword: matchesField('password', 'Les mots de passe ne correspondent pas'),
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
                title: 'Erreur',
                message: error.message,
                color: 'red',
              });
            }
          },
          onResponse: () => setRegisterLoading(false),
        }
      );
    },
    [navigate]
  );

  return {
    registerForm,
    registerLoading,
    handleRegister,
  };
};

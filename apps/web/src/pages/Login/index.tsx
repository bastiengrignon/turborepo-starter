import { Anchor, Button, Flex, PasswordInput, Stack, TextInput } from '@mantine/core';
import type { FC } from 'react';

import AuthLayout from '../../auth-layout';
import { routes } from '../../router';
import { useLoginHooks } from './Login.hooks';

const Login: FC = () => {
  const { loginForm, loginLoading, handleLogin } = useLoginHooks();
  return (
    <AuthLayout title="Connexion">
      <form onSubmit={loginForm.onSubmit(handleLogin)}>
        <Stack>
          <TextInput label="Email" key={loginForm.key('email')} {...loginForm.getInputProps('email')} />
          <PasswordInput
            label="Mot de passe"
            key={loginForm.key('password')}
            {...loginForm.getInputProps('password')}
          />
          <Flex align="center" justify="space-between" mt="xl">
            <Anchor href={routes.signup} size="sm">
              Pas de compte ?
            </Anchor>
            <Button type="submit" loading={loginLoading}>
              Se connecter
            </Button>
          </Flex>
        </Stack>
      </form>
    </AuthLayout>
  );
};

export default Login;

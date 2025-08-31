import { Anchor, Button, Flex, PasswordInput, Stack, TextInput } from '@mantine/core';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import AuthLayout from '../../auth-layout';
import { routes } from '../../router';
import { useLoginHooks } from './Login.hooks';

const Login: FC = () => {
  const { t } = useTranslation('auth');
  const { loginForm, loginLoading, handleLogin } = useLoginHooks({ t });
  return (
    <AuthLayout title={t('login')}>
      <form onSubmit={loginForm.onSubmit(handleLogin)}>
        <Stack>
          <TextInput
            required
            label={t('email')}
            placeholder={t('email')}
            key={loginForm.key('email')}
            {...loginForm.getInputProps('email')}
          />
          <PasswordInput
            required
            label={t('password')}
            placeholder={t('password')}
            key={loginForm.key('password')}
            {...loginForm.getInputProps('password')}
          />
          <Flex align="center" justify="space-between" mt="xl">
            <Anchor href={routes.signup} size="sm">
              {t('noAccount')}
            </Anchor>
            <Button type="submit" loading={loginLoading}>
              {t('loginButton')}
            </Button>
          </Flex>
        </Stack>
      </form>
    </AuthLayout>
  );
};

export default Login;

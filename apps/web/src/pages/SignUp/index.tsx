import { Anchor, Button, Flex, PasswordInput, SimpleGrid, Stack, TextInput } from '@mantine/core';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import AuthLayout from '../../auth-layout';
import { routes } from '../../router';
import { useSignUpHooks } from './SignUp.hooks';

const SignUp: FC = () => {
  const { t } = useTranslation('auth');
  const { registerForm, registerLoading, handleRegister } = useSignUpHooks({ t });
  return (
    <AuthLayout title={t('signUp')}>
      <form onSubmit={registerForm.onSubmit(handleRegister)}>
        <Stack>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
            <TextInput
              required
              label={t('firstName')}
              placeholder={t('firstName')}
              key={registerForm.key('firstName')}
              {...registerForm.getInputProps('firstName')}
            />
            <TextInput
              required
              label={t('lastName')}
              placeholder={t('lastName')}
              key={registerForm.key('lastName')}
              {...registerForm.getInputProps('lastName')}
            />
          </SimpleGrid>
          <TextInput
            required
            label={t('email')}
            placeholder={t('email')}
            key={registerForm.key('email')}
            {...registerForm.getInputProps('email')}
          />
          <PasswordInput
            required
            label={t('password')}
            placeholder={t('password')}
            key={registerForm.key('password')}
            {...registerForm.getInputProps('password')}
          />
          <PasswordInput
            required
            label={t('confirmPassword')}
            placeholder={t('confirmPassword')}
            key={registerForm.key('confirmPassword')}
            {...registerForm.getInputProps('confirmPassword')}
          />
          <Flex align="center" justify="space-between" mt="xl">
            <Anchor href={routes.login} size="sm">
              {t('alreadyAccount')}
            </Anchor>
            <Button type="submit" loading={registerLoading}>
              {t('signUpButton')}
            </Button>
          </Flex>
        </Stack>
      </form>
    </AuthLayout>
  );
};

export default SignUp;

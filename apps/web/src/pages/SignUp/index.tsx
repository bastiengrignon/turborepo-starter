import { Anchor, Button, Flex, PasswordInput, SimpleGrid, Stack, TextInput } from '@mantine/core';
import type { FC } from 'react';

import AuthLayout from '../../auth-layout';
import { routes } from '../../router';
import { useSignUpHooks } from './SignUp.hooks';

const SignUp: FC = () => {
  const { registerForm, registerLoading, handleRegister } = useSignUpHooks();
  return (
    <AuthLayout title="Inscription">
      <form onSubmit={registerForm.onSubmit(handleRegister)}>
        <Stack>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
            <TextInput
              label="Prénom"
              key={registerForm.key('firstName')}
              {...registerForm.getInputProps('firstName')}
            />
            <TextInput
              label="Nom de famille"
              key={registerForm.key('lastName')}
              {...registerForm.getInputProps('lastName')}
            />
          </SimpleGrid>
          <TextInput label="Email" key={registerForm.key('email')} {...registerForm.getInputProps('email')} />
          <PasswordInput
            label="Mot de passe"
            key={registerForm.key('password')}
            {...registerForm.getInputProps('password')}
          />
          <PasswordInput
            label="Confirmation du mot de passe"
            key={registerForm.key('confirmPassword')}
            {...registerForm.getInputProps('confirmPassword')}
          />
          <Flex align="center" justify="space-between" mt="xl">
            <Anchor href={routes.login} size="sm">
              Vous avez un compte ?
            </Anchor>
            <Button type="submit" loading={registerLoading}>
              Inscription
            </Button>
          </Flex>
        </Stack>
      </form>
    </AuthLayout>
  );
};

export default SignUp;

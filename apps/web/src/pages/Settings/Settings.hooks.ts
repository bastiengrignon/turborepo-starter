import { hasLength, isEmail, matches, matchesField, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import type { TFunction } from 'i18next';
import { type ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

import { REGEXPS } from '../../constants/regexp';
import { authClient } from '../../lib/auth-client';
import { useSession } from '../../lib/useSession';

interface UserFormValues {
  firstName: string;
  lastName: string;
  email: string;
}

interface PasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface SettingsHooksInputProps {
  t: TFunction;
}

export const useSettingsHooks = ({ t }: SettingsHooksInputProps) => {
  const { user } = useSession();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [updateUserLoading, setUpdateUserLoading] = useState(false);
  const [updatePasswordLoading, setUpdatePasswordLoading] = useState(false);

  const userForm = useForm<UserFormValues>({
    mode: 'uncontrolled',
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    validateInputOnBlur: true,
    validate: {
      firstName: hasLength({ min: 2 }, t('auth:errors.firstName')),
      lastName: hasLength({ min: 2 }, t('auth:errors.lastName')),
      email: isEmail(t('auth:errors.emailInvalid')),
    },
  });

  const updatePasswordForm = useForm({
    mode: 'uncontrolled',
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validateInputOnBlur: true,
    validate: {
      newPassword: matches(REGEXPS.PASSWORD, t('auth:errors.passwordRegexp')),
      confirmNewPassword: matchesField('newPassword', t('auth:errors.confirmPassword')),
    },
  });

  const handleUpdateProfilePicture = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleUploadProfilePicture = useCallback(({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
    if ((files?.length || 0) > 0) {
      //Handle file uploading
    }
  }, []);

  const handleUpdateUser = useCallback(
    async ({ firstName, lastName }: UserFormValues) => {
      setUpdateUserLoading(true);
      await authClient.updateUser(
        {
          firstName,
          lastName,
          name: `${firstName} ${lastName}`,
        },
        {
          onError: ({ error }) => {
            notifications.show({
              title: t('error'),
              message: error.message,
              color: 'red',
            });
          },
          onResponse: () => setUpdateUserLoading(false),
        }
      );
    },
    [t]
  );

  const handleUpdatePassword = useCallback(
    async (values: PasswordFormValues) => {
      setUpdatePasswordLoading(true);
      await authClient.changePassword(
        {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
          revokeOtherSessions: true,
        },
        {
          onResponse: () => setUpdatePasswordLoading(false),
          onError: ({ error }) => {
            notifications.show({
              title: t('error'),
              message: error.message,
              color: 'red',
            });
          },
        }
      );
    },
    [t]
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: no Mantine form object in dependencies
  useEffect(() => {
    if (user) {
      userForm.setValues({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    }
  }, [user]);

  return {
    fileInputRef,
    user,
    userForm,
    updatePasswordForm,
    updateUserLoading,
    updatePasswordLoading,
    handleUpdateProfilePicture,
    handleUploadProfilePicture,
    handleUpdateUser,
    handleUpdatePassword,
  };
};

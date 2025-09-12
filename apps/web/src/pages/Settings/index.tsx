import {
  Avatar,
  Button,
  Divider,
  Group,
  Indicator,
  PasswordInput,
  Stack,
  Tabs,
  TextInput,
  Title,
  UnstyledButton,
} from '@mantine/core';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { TbRefresh } from 'react-icons/tb';

import SettingsPanelLayout from '../../components/SettingsPanelLayout';
import { useMobileQuery } from '../../lib/responsive';
import { useSettingsHooks } from './Settings.hooks';

const Settings: FC = () => {
  const { t } = useTranslation('common');
  const isMobile = useMobileQuery();
  const {
    fileInputRef,
    user,
    userForm,
    updatePasswordForm,
    visiblePassword,
    toggleVisiblePassword,
    updateUserLoading,
    updatePasswordLoading,
    handleUpdateProfilePicture,
    handleUploadProfilePicture,
    handleUpdateUser,
    handleUpdatePassword,
    handleResetPassword,
  } = useSettingsHooks({ t });

  return (
    <Tabs orientation={isMobile ? 'horizontal' : 'vertical'} variant="outline" defaultValue="account">
      <Tabs.List>
        <Tabs.Tab value="account">{t('settings.account.title')}</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="account">
        <SettingsPanelLayout title={t('settings.account.title')}>
          <form onSubmit={userForm.onSubmit(handleUpdateUser)}>
            <Stack>
              <Title order={3}>{t('settings.account.personalInformation')}</Title>
              <Group gap="xl">
                <input ref={fileInputRef} type="file" hidden accept="image/*" onChange={handleUploadProfilePicture} />
                <UnstyledButton onClick={handleUpdateProfilePicture}>
                  <Indicator
                    disabled={!!user?.image || false}
                    position="bottom-end"
                    withBorder
                    size={24}
                    inline
                    label="+"
                    color="gray"
                  >
                    <Avatar radius="xl" size="lg" name={user?.name} color="initials" />
                  </Indicator>
                </UnstyledButton>
                <TextInput
                  disabled
                  label={t('auth:email')}
                  placeholder={t('auth:email')}
                  key={userForm.key('email')}
                  {...userForm.getInputProps('email')}
                />
              </Group>
              <Group>
                <TextInput
                  required
                  label={t('auth:firstName')}
                  placeholder={t('auth:firstName')}
                  key={userForm.key('firstName')}
                  {...userForm.getInputProps('firstName')}
                />
                <TextInput
                  required
                  label={t('auth:lastName')}
                  placeholder={t('auth:lastName')}
                  key={userForm.key('lastName')}
                  {...userForm.getInputProps('lastName')}
                />
              </Group>
            </Stack>
            <Button mt="md" type="submit" loading={updateUserLoading}>
              {t('save')}
            </Button>
          </form>
          <Divider my="md" />
          <Title order={3}>{t('settings.account.password')}</Title>
          <form onSubmit={updatePasswordForm.onSubmit(handleUpdatePassword)}>
            <Stack>
              <PasswordInput
                required
                label={t('settings.account.currentPassword')}
                placeholder={t('settings.account.currentPassword')}
                key={updatePasswordForm.key('currentPassword')}
                {...updatePasswordForm.getInputProps('currentPassword')}
              />
              <PasswordInput
                required
                visible={visiblePassword}
                onVisibilityChange={toggleVisiblePassword}
                label={t('settings.account.newPassword')}
                placeholder={t('settings.account.newPassword')}
                key={updatePasswordForm.key('newPassword')}
                {...updatePasswordForm.getInputProps('newPassword')}
              />
              <PasswordInput
                required
                visible={visiblePassword}
                onVisibilityChange={toggleVisiblePassword}
                label={t('settings.account.confirmNewPassword')}
                placeholder={t('settings.account.confirmNewPassword')}
                key={updatePasswordForm.key('confirmNewPassword')}
                {...updatePasswordForm.getInputProps('confirmNewPassword')}
              />
            </Stack>
            <Group mt="md" gap="xs">
              <Button type="submit" loading={updatePasswordLoading}>
                {t('settings.account.updatePassword')}
              </Button>
              <Button color="yellow" rightSection={<TbRefresh />} onClick={handleResetPassword}>
                {t('settings.account.resetPassword')}
              </Button>
            </Group>
          </form>
        </SettingsPanelLayout>
      </Tabs.Panel>
    </Tabs>
  );
};

export default Settings;

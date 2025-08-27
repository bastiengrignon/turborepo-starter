import { Anchor, Avatar, Flex, Group, Menu, Title, UnstyledButton } from '@mantine/core';
import type { FC } from 'react';
import { TbLogout, TbSettings } from 'react-icons/tb';
import { Link } from 'react-router';

import ColorSwitcher from '../components/ColorSwitcher';
import { replaceRouteParams } from '../lib/router';
import { routes } from '../router';
import { useLayoutHooks } from './Layout.hooks';

const Header: FC = () => {
  const { user, handleLogout } = useLayoutHooks();
  return (
    <Flex align="center" justify="space-between" px="md" py="xs" h="100%">
      <Anchor component={Link} to={routes.home} underline="never" c="inherit">
        <Title order={3}>My App</Title>
      </Anchor>
      {/*<Link to={routes.home}>*/}
      {/*</Link>*/}
      <Group>
        <ColorSwitcher />
        <Menu width={220} position="bottom-end" transitionProps={{ transition: 'pop-top-right' }} withinPortal>
          <Menu.Target>
            <UnstyledButton>
              <Avatar
                size="md"
                radius="sm"
                color="initials"
                name={`${user?.firstName} ${user?.lastName}`}
                alt={`${user?.firstName} ${user?.lastName}`}
                src={user?.image}
              />
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>
              {user?.firstName} {user?.lastName}
            </Menu.Label>
            <Menu.Item
              leftSection={<TbSettings size={16} />}
              component={Link}
              to={replaceRouteParams(routes.user.settings, { userId: user?.id || '' })}
            >
              Account settings
            </Menu.Item>
            <Menu.Item color="red" leftSection={<TbLogout size={16} />} onClick={handleLogout}>
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Flex>
  );
};

export default Header;

import { ActionIcon, ThemeIcon, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import type { FC } from 'react';
import { TbMoon, TbSun } from 'react-icons/tb';

const ColorSwitcher: FC = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <ActionIcon size="lg" onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}>
      <ThemeIcon darkHidden>
        <TbSun />
      </ThemeIcon>
      <ThemeIcon lightHidden>
        <TbMoon />
      </ThemeIcon>
    </ActionIcon>
  );
};

export default ColorSwitcher;

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

import { router } from './router';
import { theme } from './theme';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

// biome-ignore lint/style/noNonNullAssertion: root is defined
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <Notifications position="top-right" />
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>
);

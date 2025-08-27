import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import { authClient } from '../lib/auth-client';
import { useSession } from '../lib/useSession';
import { routes } from '../router';

export const useLayoutHooks = () => {
  const navigate = useNavigate();
  const { session, user, isPending } = useSession();

  const handleLogout = useCallback(
    async () =>
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => navigate(routes.login),
        },
      }),
    [navigate]
  );

  return {
    session,
    user,
    isPending,
    handleLogout,
  };
};

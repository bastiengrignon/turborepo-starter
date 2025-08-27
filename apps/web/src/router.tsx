import { createBrowserRouter } from 'react-router';

import PrivateRoute from './components/PrivateRoute';
import Layout from './layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import UserSettings from './pages/UserSettings';

export const routes = {
  home: '/',
  login: '/login',
  signup: '/signup',
  user: {
    settings: '/user/:userId/settings',
  },
};

export const router = createBrowserRouter([
  {
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      {
        path: routes.home,
        element: <Home />,
      },
      {
        path: routes.user.settings,
        element: <UserSettings />,
      },
    ],
  },
  {
    path: routes.login,
    element: <Login />,
  },
  {
    path: routes.signup,
    element: <SignUp />,
  },
]);

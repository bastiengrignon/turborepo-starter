import { createBrowserRouter } from 'react-router';

import PrivateRoute from './components/PrivateRoute';
import Layout from './layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Settings from './pages/Settings';
import SignUp from './pages/SignUp';

export const routes = {
  home: '/',
  login: '/login',
  signup: '/signup',
  settings: '/settings',
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
        path: routes.settings,
        element: <Settings />,
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

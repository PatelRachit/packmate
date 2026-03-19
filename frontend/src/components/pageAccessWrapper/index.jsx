import { Navigate, Outlet } from 'react-router-dom';
import { PAGE_LOGIN, PAGE_USERS } from '../../utils/constants/index';
import useAuth from '../../hooks/useAuth';

const PageAccessWrapper = () => {
  const { isAuthenticated, user } = useAuth();

  // if not authenticated
  if (!isAuthenticated) {
    return <Navigate replace to={PAGE_LOGIN.path} />;
  }

  if (!user.isAdmin && isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate replace to={PAGE_USERS.path} />;
};

export default PageAccessWrapper;

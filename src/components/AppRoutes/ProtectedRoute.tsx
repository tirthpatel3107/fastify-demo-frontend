import { Navigate } from 'react-router-dom';

// utils
import { AUTH_ROUTE } from 'src/utils/apis/routes/clientApiRoutes';
import { LOCAL_STORAGE } from 'src/utils/constants/auth';
import { getLocalStorage } from 'src/utils/storage';

interface ProtectedRouteProps {
  Component: React.ElementType;
  ModulePermission: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ Component }) => {
  const token = getLocalStorage(LOCAL_STORAGE.TOKEN);

  if (token) {
    return <Component />;
  } else {
    return <Navigate to={AUTH_ROUTE.LOGIN} />;
  }
};

export default ProtectedRoute;

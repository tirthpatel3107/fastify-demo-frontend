import { Navigate, Route, Routes } from 'react-router-dom';

// Layouts
import PlainLayout from '../../layouts/PlainLayout';

// components
import Dashboard from '../../pages/Dashboard';
import Login from '../../pages/Login';
import PageNotFound from '../../pages/PageNotFound';
// import ProtectedRoute from "./ProtectedRoute";

// constants
import { ROUTE } from '../../utils/apis/routes/clientApiRoutes';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<PlainLayout />}>
        <Route index element={<Navigate to={ROUTE.LOGIN} replace />} />
        <Route path={ROUTE.LOGIN} element={<Login />} />
        <Route path={ROUTE.DASHBOARD} element={<Dashboard />} />
        <Route path='*' element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

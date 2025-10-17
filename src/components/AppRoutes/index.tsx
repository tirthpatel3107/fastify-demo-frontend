import { Navigate, Route, Routes } from 'react-router-dom';

// layouts
import PlainLayout from '../../layouts/PlainLayout';

// components
import Dashboard from '../../pages/Dashboard';
import Login from '../../pages/Login';
import PageNotFound from '../../pages/PageNotFound';

// utils
import { ROUTE } from '../../lib/api/routes/clientApiRoutes';

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

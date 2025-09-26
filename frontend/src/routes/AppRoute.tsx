import { Route, Routes } from 'react-router';
import Login from '../pages/Auth/Login';
import Home from '../pages/Main/Home';
import ProtectedRoute from './ProtectedRoute';

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default AppRoute;

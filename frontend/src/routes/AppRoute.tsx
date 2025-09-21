import { Route, Routes } from 'react-router';
import Login from '../pages/Auth/Login';
import Home from '../pages/Main/Home';

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route index path="/" element={<Home />} />
    </Routes>
  );
};

export default AppRoute;

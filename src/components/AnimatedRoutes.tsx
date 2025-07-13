import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Create from '../pages/Create';
import MyCards from '../pages/MyCards';
import Favorites from '../pages/Favorites';
import About from '../pages/About';
import CardDetail from '../pages/CardDetail';
import EditCard from '../pages/EditCard';
import ProtectedRoute from './ProtectedRoute';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/card/:id" element={<CardDetail />} />
        
        {/* Protected Routes */}
        <Route path="/create" element={
          <ProtectedRoute>
            <Create />
          </ProtectedRoute>
        } />
        <Route path="/my-cards" element={
          <ProtectedRoute>
            <MyCards />
          </ProtectedRoute>
        } />
        <Route path="/favorites" element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        } />
        <Route path="/edit/:id" element={
          <ProtectedRoute>
            <EditCard />
          </ProtectedRoute>
        } />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;

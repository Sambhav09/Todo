
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';


// Helper to get auth state from localStorage
const getAuth = () => {
  return localStorage.getItem('userId');
};

const PrivateRoute = ({ children }) => {
  const isAuth = getAuth();
  return isAuth ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const isAuth = getAuth();
  return !isAuth ? children : <Navigate to="/" replace />;
};


const App = () => {
  // Listen for login in child components (optional, for rerender)
  const [auth, setAuth] = useState(getAuth());

  useEffect(() => {
    const onStorage = () => setAuth(getAuth());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/about" element={<PrivateRoute><h1>About Page</h1></PrivateRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
      </Routes>
    </Router>
  );
};

export default App;

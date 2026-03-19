// src/App.js
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { mockUser } from './utils/mockData';

import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import CreateTrip from './pages/CreateTrip/CreateTrip';
import TripDetail from './pages/TripDetail/TripDetail';
import Community from './pages/Community/Community';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';

import './styles/global.css';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('pm_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('pm_user');
      }
    } else {
      // demo: auto-login
      setUser(mockUser);
      localStorage.setItem('pm_user', JSON.stringify(mockUser));
    }
  }, []);

  const handleLogin = (u, token) => {
    setUser(u);
    localStorage.setItem('pm_user', JSON.stringify(u));
    if (token) localStorage.setItem('pm_token', token);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('pm_user');
    localStorage.removeItem('pm_token');
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route
          path="/create-trip"
          element={user ? <CreateTrip /> : <Navigate to="/login" replace />}
        />
        <Route path="/trip/:id" element={<TripDetail />} />
        <Route path="/community" element={<Community user={user} />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/dashboard" replace /> : <Register onLogin={handleLogin} />}
        />
        <Route
          path="/profile"
          element={
            user ? (
              <Profile user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;

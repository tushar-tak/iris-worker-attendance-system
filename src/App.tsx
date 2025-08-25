import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { useAuth } from './context/AuthContext';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import CurrentTeam from './pages/CurrentTeam';
import NewWork from './pages/NewWork';
import About from './pages/About';
import Settings from './pages/Settings/Settings';
import Contact from './pages/Settings/Contact';
import Help from './pages/Settings/Help';
import Feedback from './pages/Settings/Feedback';
import ChangePassword from './pages/Settings/ChangePassword';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isHydrating } = useAuth();
  if (isHydrating) {
    return <div className="container" style={{ padding: 40, display: 'grid', placeItems: 'center', minHeight: '50vh' }}>
      <div className="spinner" />
    </div>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  const { isAuthenticated, isHydrating } = useAuth();

  return (
    <div>
      {!isHydrating && isAuthenticated ? (
        <>
          <Header />
          <Navbar />
        </>
      ) : null}
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teams"
            element={
              <ProtectedRoute>
                <CurrentTeam />
              </ProtectedRoute>
            }
          />
          <Route
            path="/new-work"
            element={
              <ProtectedRoute>
                <NewWork />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          >
            <Route index element={<Help />} />
            <Route path="contact" element={<Contact />} />
            <Route path="help" element={<Help />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>

          <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

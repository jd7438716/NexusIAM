import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { MfaVerify } from './pages/auth/MfaVerify';
import { Overview } from './pages/dashboard/Overview';
import { Security } from './pages/dashboard/Security';
import { Wallet } from './pages/dashboard/Wallet';
import { Files } from './pages/dashboard/Files';
import { Profile } from './pages/dashboard/Profile';
import { Notifications } from './pages/dashboard/Notifications';
import { Invitations } from './pages/dashboard/Invitations';
import { Chat } from './pages/dashboard/Chat';
import { AuditLogs } from './pages/admin/AuditLogs';
import { Users } from './pages/admin/Users';
import { Broadcast } from './pages/admin/Broadcast';
import { User } from './types';
import { MOCK_USER, MOCK_TRANSACTIONS, MOCK_NOTIFICATIONS } from './services/mockData';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  // For this demo, we start logged out.
  const handleLogin = () => {
    setUser(MOCK_USER);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <HashRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={!user ? <Login onLoginSuccess={handleLogin} /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        <Route path="/forgot-password" element={!user ? <ForgotPassword /> : <Navigate to="/" />} />
        <Route path="/mfa-verify" element={!user ? <MfaVerify onLoginSuccess={handleLogin} /> : <Navigate to="/" />} />
        
        {/* Protected Routes */}
        <Route path="/" element={
          user ? (
            <Layout user={user} onLogout={handleLogout}>
              <Overview user={user} transactions={MOCK_TRANSACTIONS} notifications={MOCK_NOTIFICATIONS} />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        } />

        <Route path="/security" element={
          user ? (
            <Layout user={user} onLogout={handleLogout}>
              <Security user={user} />
            </Layout>
          ) : <Navigate to="/login" />
        } />

        <Route path="/wallet" element={
          user ? (
            <Layout user={user} onLogout={handleLogout}>
              <Wallet />
            </Layout>
          ) : <Navigate to="/login" />
        } />

         <Route path="/files" element={
          user ? (
            <Layout user={user} onLogout={handleLogout}>
              <Files />
            </Layout>
          ) : <Navigate to="/login" />
        } />
        
        <Route path="/profile" element={
          user ? (
            <Layout user={user} onLogout={handleLogout}>
              <Profile user={user} />
            </Layout>
          ) : <Navigate to="/login" />
        } />
        
        <Route path="/notifications" element={
          user ? (
            <Layout user={user} onLogout={handleLogout}>
              <Notifications />
            </Layout>
          ) : <Navigate to="/login" />
        } />

        <Route path="/invitations" element={
          user ? (
            <Layout user={user} onLogout={handleLogout}>
              <Invitations />
            </Layout>
          ) : <Navigate to="/login" />
        } />

        <Route path="/chat" element={
          user ? (
            <Layout user={user} onLogout={handleLogout}>
              <Chat />
            </Layout>
          ) : <Navigate to="/login" />
        } />

        {/* Admin Routes */}
        <Route path="/admin/logs" element={
          user ? (
            <Layout user={user} onLogout={handleLogout}>
              <AuditLogs />
            </Layout>
          ) : <Navigate to="/login" />
        } />

        <Route path="/admin/users" element={
          user ? (
            <Layout user={user} onLogout={handleLogout}>
              <Users />
            </Layout>
          ) : <Navigate to="/login" />
        } />

        <Route path="/admin/broadcast" element={
          user ? (
            <Layout user={user} onLogout={handleLogout}>
              <Broadcast />
            </Layout>
          ) : <Navigate to="/login" />
        } />

      </Routes>
    </HashRouter>
  );
};

export default App;

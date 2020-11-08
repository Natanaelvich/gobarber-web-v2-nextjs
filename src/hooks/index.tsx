import React from 'react';
import { AuthProvider } from './modules/AuthContext';
import { ToastProvider } from './modules/ToastContext';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
);

export default AppProvider;

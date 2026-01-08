import React, { createContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services';
import { setAuthToken } from '../api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load user on mount
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('accessToken');
      const refresh = localStorage.getItem('refreshToken');

      console.log('[AuthContext] Loading user...', { hasToken: !!token, hasRefresh: !!refresh });

      if (token && refresh) {
        try {
          // Set token in axios headers
          setAuthToken(token);
          const userData = await authService.getCurrentUser();
          console.log('[AuthContext] User loaded successfully:', userData);
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('[AuthContext] Failed to load user:', error);
          // Clear invalid tokens
          setAuthToken(null);
          localStorage.removeItem('refreshToken');
          setAccessToken(null);
          setRefreshToken(null);
        }
      } else {
        console.log('[AuthContext] No tokens found, user not authenticated');
      }

      setIsLoading(false);
      console.log('[AuthContext] Loading complete');
    };

    loadUser();
  }, []);

  // Login function
  const login = useCallback(async (email, password) => {
    try {
      console.log('[AuthContext] Attempting login for:', email);
      const response = await authService.login(email, password);
      const { user: userData, accessToken: newAccessToken, refreshToken: newRefreshToken } = response;

      console.log('[AuthContext] Login successful, saving tokens');
      // Save tokens and set in axios headers
      setAuthToken(newAccessToken);
      localStorage.setItem('refreshToken', newRefreshToken);

      setUser(userData);
      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);
      setIsAuthenticated(true);

      console.log('[AuthContext] Auth state updated, isAuthenticated:', true);
      return { success: true, user: userData };
    } catch (error) {
      console.error('[AuthContext] Login failed:', error);
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Login failed',
      };
    }
  }, []);

  // Register function
  const register = useCallback(async (userData) => {
    try {
      const response = await authService.register(userData);
      const { user: newUser, accessToken: newAccessToken, refreshToken: newRefreshToken } = response;

      // Save tokens and set in axios headers
      setAuthToken(newAccessToken);
      localStorage.setItem('refreshToken', newRefreshToken);

      setUser(newUser);
      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);
      setIsAuthenticated(true);

      return { success: true, user: newUser };
    } catch (error) {
      console.error('Registration failed:', error);
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Registration failed',
      };
    }
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    try {
      const currentRefreshToken = localStorage.getItem('refreshToken');
      if (currentRefreshToken) {
        await authService.logout(currentRefreshToken);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear state, storage, and axios headers
      setAuthToken(null);
      localStorage.removeItem('refreshToken');
      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);
      setIsAuthenticated(false);
    }
  }, []);

  // Logout from all devices
  const logoutAll = useCallback(async () => {
    try {
      await authService.logoutAll();
    } catch (error) {
      console.error('Logout all error:', error);
    } finally {
      // Clear state, storage, and axios headers
      setAuthToken(null);
      localStorage.removeItem('refreshToken');
      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);
      setIsAuthenticated(false);
    }
  }, []);

  // Update user data
  const updateUser = useCallback((userData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...userData,
    }));
  }, []);

  // Check if user has required role
  const hasRole = useCallback(
    (requiredRoles) => {
      if (!user || !user.role) return false;

      if (Array.isArray(requiredRoles)) {
        return requiredRoles.includes(user.role);
      }

      return user.role === requiredRoles;
    },
    [user]
  );

  // Check if user has permission
  const hasPermission = useCallback(
    (permission) => {
      if (!user || !user.role) return false;

      // Permission requirements
      const permissionRoles = {
        'video:upload': ['Docente', 'Administrador', 'SuperAdmin'],
        'video:approve': ['Administrador', 'SuperAdmin'],
        'user:manage': ['Administrador', 'SuperAdmin'],
        'system:config': ['SuperAdmin'],
      };

      const requiredRoles = permissionRoles[permission];
      if (!requiredRoles) return false;

      return requiredRoles.includes(user.role);
    },
    [user]
  );

  const value = {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    logoutAll,
    updateUser,
    hasRole,
    hasPermission,
    setAuthToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export default AuthContext;
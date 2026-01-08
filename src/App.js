import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { ThemeModeProvider, useThemeMode } from './core/context/ThemeContext';
import { AuthProvider } from './core/context/AuthContext';
import { SnackbarProvider } from './core/context/SnackbarContext';
import ErrorBoundary from './components/shared/ErrorBoundary';
import ProtectedRoute from './core/components/ProtectedRoute';
import RoleRoute from './core/components/RoleRoute';

// Layouts
import PortalLayout from './layouts/PortalLayout';

// Public Pages
import LandingPage from './pages/LandingPage/LandingPage';
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import VideosPage from './pages/VideosPage/VideosPage';
import VideoDetailPage from './pages/VideoDetailPage/VideoDetailPage';

// Authenticated Pages
import DashboardPage from './pages/Portal/DashboardPage/DashboardPage';
import ProfilePage from './pages/Portal/ProfilePage/ProfilePage';
import MyVideosPage from './pages/Portal/MyVideosPage/MyVideosPage';
import UploadVideoPage from './pages/Portal/UploadVideoPage/UploadVideoPage';
import VideoPlayerPage from './pages/Portal/VideoPlayerPage/VideoPlayerPage';
import UserProfilePage from './pages/Portal/UserProfilePage/UserProfilePage';
import ForoPage from './pages/Portal/ForoPage/ForoPage';
import RecursosPage from './pages/Portal/RecursosPage/RecursosPage';
import ComunidadPage from './pages/Portal/ComunidadPage/ComunidadPage';

// Admin Pages
import UsersManagementPage from './pages/Portal/Admin/UsersManagementPage';
import PendingVideosPage from './pages/Portal/Admin/PendingVideosPage';

import './App.css';

/**
 * AppContent - Component that uses the theme
 * This must be inside ThemeModeProvider to access useThemeMode
 */
function AppContent() {
  const { theme } = useThemeMode();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <SnackbarProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/videos" element={<VideosPage />} />
              <Route path="/video/:id" element={<VideoDetailPage />} />

              {/* Protected Routes - Portal */}
              <Route
                path="/portal"
                element={
                  <ProtectedRoute>
                    <PortalLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/portal/dashboard" replace />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="profile/:userId" element={<UserProfilePage />} />
                <Route path="video-player" element={<VideoPlayerPage />} />
                <Route path="video-player/:id" element={<VideoPlayerPage />} />
                <Route path="foro" element={<ForoPage />} />
                <Route path="recursos" element={<RecursosPage />} />
                <Route path="comunidad" element={<ComunidadPage />} />

                {/* Docente+ Routes */}
                <Route
                  path="my-videos"
                  element={
                    <RoleRoute roles={['Docente', 'Administrador', 'SuperAdmin']}>
                      <MyVideosPage />
                    </RoleRoute>
                  }
                />
                <Route
                  path="upload-video"
                  element={
                    <RoleRoute roles={['Docente', 'Administrador', 'SuperAdmin']}>
                      <UploadVideoPage />
                    </RoleRoute>
                  }
                />

                {/* Admin Routes */}
                <Route
                  path="admin/users"
                  element={
                    <RoleRoute roles={['Administrador', 'SuperAdmin']}>
                      <UsersManagementPage />
                    </RoleRoute>
                  }
                />
                <Route
                  path="admin/pending-videos"
                  element={
                    <RoleRoute roles={['Administrador', 'SuperAdmin']}>
                      <PendingVideosPage />
                    </RoleRoute>
                  }
                />
              </Route>

              {/* 404 */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </SnackbarProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

/**
 * App - Root component
 * Wraps everything with ErrorBoundary and ThemeModeProvider
 */
function App() {
  return (
    <ErrorBoundary>
      <ThemeModeProvider>
        <AppContent />
      </ThemeModeProvider>
    </ErrorBoundary>
  );
}

export default App;
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { ThemeModeProvider, useThemeMode } from './core/context/ThemeContext';
import { AuthProvider } from './core/context/AuthContext';
import { SnackbarProvider } from './core/context/SnackbarContext.jsx';
import ErrorBoundary from './components/shared/ErrorBoundary';
import ProtectedRoute from './core/components/ProtectedRoute';
import RoleRoute from './core/components/RoleRoute';
import LoadingFallback from './components/shared/LoadingFallback.jsx';
import './App.css';

// Layouts - Keep this eager loaded as it's needed for all portal routes
import PortalLayout from './layouts/PortalLayout';

// Lazy-loaded Public Pages
const LandingPage = React.lazy(() => import('./pages/LandingPage/LandingPage.jsx'));
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage/AboutPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const VideosPage = lazy(() => import('./pages/VideosPage/VideosPage'));
const VideoDetailPage = lazy(() => import('./pages/VideoDetailPage/VideoDetailPage'));

// Lazy-loaded Authenticated Pages
const DashboardPage = lazy(() => import('./pages/Portal/DashboardPage/DashboardPage'));
const ProfilePage = lazy(() => import('./pages/Portal/ProfilePage/ProfilePage'));
const MyVideosPage = lazy(() => import('./pages/Portal/MyVideosPage/MyVideosPage'));
const UploadVideoPage = lazy(() => import('./pages/Portal/UploadVideoPage/UploadVideoPage'));
const VideoPlayerPage = lazy(() => import('./pages/Portal/VideoPlayerPage/VideoPlayerPage'));
const UserProfilePage = lazy(() => import('./pages/Portal/UserProfilePage/UserProfilePage'));
const ForoPage = lazy(() => import('./pages/Portal/ForoPage/ForoPage'));
const PostDetailPage = lazy(() => import('./pages/Portal/ForoPage/PostDetailPage'));
const RecursosPage = lazy(() => import('./pages/Portal/RecursosPage/RecursosPage'));
const ComunidadPage = lazy(() => import('./pages/Portal/ComunidadPage/ComunidadPage'));

// Lazy-loaded Admin Pages
const UsersManagementPage = lazy(() => import('./pages/Portal/Admin/UsersManagementPage'));
const PendingVideosPage = lazy(() => import('./pages/Portal/Admin/PendingVideosPage'));

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
            <Suspense fallback={<LoadingFallback />}>
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
                  <Route path="foro/:postId" element={<PostDetailPage />} />
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
            </Suspense>
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
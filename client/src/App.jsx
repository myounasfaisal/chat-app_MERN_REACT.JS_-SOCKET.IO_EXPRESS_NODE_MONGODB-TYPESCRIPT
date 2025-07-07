import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import { useAuthStore } from './store/Auth/useAuthStore'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import Header from './components/common/Header/Header'
import ProtectedRoute from './components/common/ProtectedRoute/ProtectedRoute'
import PublicRoute from './components/common/PublicRoute/PublicRoute'

function App() {
  const { authUser, isUserLoggedIn,checkAuth } = useAuthStore();

  console.log("AuthUser in App : ",authUser);

  useEffect(() => {
    const init = async () => {
      if (!authUser && !isUserLoggedIn) {
        await checkAuth();
      }
    };
    init();
  }, [authUser, isUserLoggedIn]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Header />

      <Routes>
  <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
  
  <Route
    path="/signup"
    element={
      <PublicRoute>
        <SignupPage />
      </PublicRoute>
    }
  />
  <Route
    path="/login"
    element={
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    }
  />

  {/* 🔒 Protected Routes */}
  <Route
    path="/profile"
    element={
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    }
  />
  <Route
    path="/settings"
    element={
      <ProtectedRoute>
        <SettingsPage />
      </ProtectedRoute>
    }
  />
</Routes>
    </>
  );
}

export default App;

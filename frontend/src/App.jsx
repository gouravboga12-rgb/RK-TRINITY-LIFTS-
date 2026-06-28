import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import DefaultLayout from './layouts/DefaultLayout';

// Public pages
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';

// Auth pages
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// Dashboards & RBAC Protection
import CustomerDashboard from './customer/CustomerDashboard';
import TechnicianDashboard from './technician/TechnicianDashboard';
import AdminDashboard from './admin/AdminDashboard';
import ProtectedRoute from './routes/ProtectedRoutes';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Website Routes (Wrapped in DefaultLayout) */}
          <Route path="/" element={<DefaultLayout><Home /></DefaultLayout>} />
          <Route path="/about" element={<DefaultLayout><About /></DefaultLayout>} />
          <Route path="/products" element={<DefaultLayout><Products /></DefaultLayout>} />
          <Route path="/products/:slug" element={<DefaultLayout><ProductDetail /></DefaultLayout>} />
          <Route path="/gallery" element={<DefaultLayout><Gallery /></DefaultLayout>} />
          <Route path="/contact" element={<DefaultLayout><Contact /></DefaultLayout>} />

          {/* Authentication Routes */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected Customer Dashboard */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute allowedRoles={['customer']}>
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />

          {/* Protected Technician Dashboard */}
          <Route
            path="/technician/*"
            element={
              <ProtectedRoute allowedRoles={['technician']}>
                <TechnicianDashboard />
              </ProtectedRoute>
            }
          />

          {/* Protected Admin Console Panel */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Catch-all Redirect */}
          <Route path="*" element={<DefaultLayout><Home /></DefaultLayout>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

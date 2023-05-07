import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import './App.scss';
import AdminLogin from './components/AdminLogin';
import { AuthProvider } from './context/AuthContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
// import { UserContextProvider } from './context/UserContextProvider';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import AdminProfile from './components/AdminProfile';
import ManageUsers from './components/ManageUsers';
import AddEditUser from './components/AddEditUser';

export default function App() {
  return (
    <div>
      <AdminAuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/admin" element={<AdminLogin />} />
            <Route
              exact
              path="/adminaccount"
              element={
                <ProtectedRoute>
                  <AdminProfile />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/manageuser"
              element={
                <ProtectedRoute>
                  <ManageUsers />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/add"
              element={<AddEditUser />}
            />
            <Route
              exact
              path="/update/:id"
              element={<AddEditUser />}
            />
          </Routes>
        </BrowserRouter>
      </AdminAuthProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/user" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              exact
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/account"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

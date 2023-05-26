import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter, Routes, Route, Navigate, Switch, Link } from 'react-router-dom';
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
import ProfilePage from './components/ProfilePage';
import EditProduct from './components/EditProduct';
import EditPage from './components/EditPage';

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
              path="/edit/:productId"
              element={
                <ProtectedRoute>
                  <EditPage />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/account"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/stockhistory"
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
      </AuthProvider>
    </div>
  );
}

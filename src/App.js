// import logo from './logo.svg';
import Login from './pages/login';
// import './App.css';
import Register from './pages/register';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './components/style.scss';
import React from 'react';
import Dashboard from './pages/dashboard';
import './components/navbar.scss';
import Inventory from './pages/inventory';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


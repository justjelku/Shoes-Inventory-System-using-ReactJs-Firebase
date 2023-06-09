import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ProtectedRoute from './components/ProtectedRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App>
      <ProtectedRoute />
    </App>
  </React.StrictMode>
);
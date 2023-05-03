import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className='navbar-container'>
      <nav className="navbar">
        <Link to="/" className="logo">Shoes Inventory Management System</Link>
        <ul className="links" style={{ marginLeft: 'auto' }}>
          <li><Link to="/dashboard" class="active">Dashboard</Link></li>
          <li><Link to="/inventory" className="link">Inventory</Link></li>
          <li><Link to="/sales" className="link">Sales</Link></li>
          <li><Link to="/account" className="link">Profile</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;

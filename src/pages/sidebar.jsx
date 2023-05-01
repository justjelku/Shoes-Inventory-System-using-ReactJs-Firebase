import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="logo">My Logo</div>
      <ul className="links">
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/inventory">Inventory</Link>
        </li>
        <li>
          <Link to="/sales">Sales</Link>
        </li>
		<li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;

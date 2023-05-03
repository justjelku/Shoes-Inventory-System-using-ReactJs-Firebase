import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './NavBar';
import ContainerTables from './Tables';
import DashboardContainers from './Dashboard';

const Home
  = () => {
    return (
      <div>
        <Navbar />
        <DashboardContainers />
        <ContainerTables />
      </div>
    );
  }

export default Home;


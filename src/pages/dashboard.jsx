import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navbar';
import ContainerTables from './containertables';
import DashboardContainers from './dashboardcontainers';

const Dashboard
  = () => {
    return (
      <div>
        <Navbar />
        <DashboardContainers />
        <ContainerTables />
      </div>
    );
  }

export default Dashboard;


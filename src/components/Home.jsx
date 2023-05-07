import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './NavBar';
import {ContainerTables} from './Tables';
import DashboardContainers from './Dashboard';
import Main from './Main';
import AddProduct from './Addproduct';

const Home
  = () => {
    return (
      <div>
        <Navbar>
          <AddProduct />
        </Navbar>
        <Main>
          <DashboardContainers />
          <ContainerTables />
        </Main>
      </div>
    );
  }

export default Home;


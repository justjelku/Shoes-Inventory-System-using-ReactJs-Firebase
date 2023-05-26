import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './NavBar';
import {ContainerTables} from './Tables';
import DashboardContainers from './Dashboard';
import Main from './Main';
import AddProduct from './Addproduct';
import EditProductForm from './EditProductForm';
import { Modal } from './Modal';

const EditPage
  = () => {
    return (
      <div>
        <Navbar>
          <AddProduct />
        </Navbar>
        <Main>
		<EditProductForm />
        </Main>
      </div>
    );
  }

export default EditPage;


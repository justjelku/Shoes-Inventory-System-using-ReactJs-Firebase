import React from 'react'
import { UserTables } from './UserTable'
import Navbar from './NavBar';
import { ContainerTables } from './Tables';
import DashboardContainers from './Dashboard';
import Main from './Main';
import AddProduct from './Addproduct';
import {StockHistoryTable} from './StockHistoryTable'

function ManageUsers() {
  return (
    <div>
      <Navbar>
        <AddProduct />
      </Navbar>
      <Main>
        <DashboardContainers />
        <StockHistoryTable />
      </Main>
    </div>
  )
}

export default ManageUsers

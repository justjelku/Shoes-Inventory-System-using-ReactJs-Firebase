import React from 'react'
import { UserTables } from './UserTable'
import Navbar from './NavBar';
import { ContainerTables } from './Tables';
import Profile from './Profile';
import Main from './Main';
import AddProduct from './Addproduct';
import {StockHistoryTable} from './StockHistoryTable'

function ProfilePage() {
  return (
    <div>
      <Navbar>
      </Navbar>
      <Main>
        <Profile />
      </Main>
    </div>
  )
}

export default ProfilePage

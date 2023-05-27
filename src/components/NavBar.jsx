import AddProduct from './Addproduct';
import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { db } from '../firebase';
import {
  collection,
  query,
  where,
  onSnapshot
} from 'firebase/firestore';

function Navbar() {
  const [user, setUser] = useState(null);
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (userId) {
      const unsubscribe = onSnapshot(
        query(
          collection(db, 'users', 'qIglLalZbFgIOnO0r3Zu', 'basic_users'),
          where('userId', '==', userId)
        ),
        (querySnapshot) => {
          let userArr = [];
          querySnapshot.forEach((doc) => {
            userArr.push({ id: doc.id, ...doc.data() }); // Include all fields in the object
          });
          setUser(userArr[0]); // Assuming there is only one user document
        }
      );

      return () => unsubscribe();
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      const unsubscribe = onSnapshot(
        query(
          collection(db, 'users', 'qIglLalZbFgIOnO0r3Zu', 'basic_users', userId, 'profilePhoto'),
        ),
        (querySnapshot) => {
          let userPhoto = [];
          querySnapshot.forEach((doc) => {
            userPhoto.push({ id: doc.id, ...doc.data() }); // Include all fields in the object
          });
          setPhoto(userPhoto[0]); // Assuming there is only one user document
        }
      );

      return () => unsubscribe();
    }
  }, [userId]);

  const handleLogout = async () => {
    // Handle logout logic
  };

  return (
    <div className='navbar-container'>
      <nav className="navbar">
        <NavLink to="/" className="logo">Shoes Inventory Management System</NavLink>
        <ul className="links" style={{ marginLeft: 'auto' }}>
          <li><NavLink exact to="/" activeClassName="active">Dashboard</NavLink></li>
          <li><NavLink to="/stockhistory" activeClassName="active">Stock History</NavLink></li>
          <li><NavLink to="/account" activeClassName="active">Profile</NavLink></li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;

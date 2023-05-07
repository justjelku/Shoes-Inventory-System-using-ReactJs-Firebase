import React, { useEffect, useState } from 'react';
import { BsGraphUp, BsClock, BsClipboardData, BsCart } from 'react-icons/bs';
import { db } from '../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {
  getDocs,
  collection,
  onSnapshot,
  query
} from 'firebase/firestore';

const DashboardContainers = () => {
  const [totalQuantities, setTotalQuantities] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [products, setProducts] = useState([]);
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
      const getProduct = query(
        collection(
          db,
          'users',
          'qIglLalZbFgIOnO0r3Zu',
          'basic_users',
          userId,
          'products'
        )
      );
      const unsubscribe = onSnapshot(getProduct, (querySnapshot) => {
        let productsArr = [];
        querySnapshot.forEach((doc) => {
          productsArr.push({ id: doc.id, productTitle: doc.productTitle, ...doc.data() }); // Include all fields in the object
        });
        setProducts(productsArr);
      });
      return () => unsubscribe();
    }
  }, [setProducts, userId]);

  useEffect(() => {
    const getTotalQuantities = async () => {
      const querySnapshot = await getDocs(collection(db, 'users', 'qIglLalZbFgIOnO0r3Zu', 'basic_users', userId, 'products'));
      let total = 0;
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.productQuantity) {
          total += parseInt(data.productQuantity);
        }
      });
      console.log(`Total quantities: ${total}`);
      setTotalQuantities(total);
    };
    
    if (userId) {
      getTotalQuantities();
    }
  }, [userId]); 

  useEffect(() => {
    const getTotalPrice = async () => {
      const querySnapshot = await getDocs(collection(db, 'users', 'qIglLalZbFgIOnO0r3Zu', 'basic_users', userId, 'products'));
      let total = 0;
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.productPrice) {
          total += parseInt(data.productPrice);
        }
      });
      console.log(`Total price: ${total}`);
      setTotalPrice(total);
    };
    
    if (userId) {
      getTotalPrice();
    }
  }, [userId]); 
  

  return (
    <div className="dashboard">
      <div className="dashboard__item">
        <div className="dashboard__container">
          <div className="dashboard__icon">
            <BsGraphUp />
          </div>
          <div className="dashboard__text">
            <h3 className="dashboard__title">Total Sales</h3>
            <p className="dashboard__value">{totalPrice}</p>
          </div>
        </div>
      </div>
      <div className="dashboard__item">
        <div className="dashboard__container">
          <div className="dashboard__icon">
            <BsClock />
          </div>
          <div className="dashboard__text">
            <h3 className="dashboard__title">Pending Order</h3>
            <p className="dashboard__value">5</p>
          </div>
        </div>
      </div>
      <div className="dashboard__item">
        <div className="dashboard__container">
          <div className="dashboard__icon">
            <BsClipboardData />
          </div>
          <div className="dashboard__text">
            <h3 className="dashboard__title">Stock Available</h3>
            <p className="dashboard__value">
            {totalQuantities}
            </p>
          </div>
        </div>
      </div>
      <div className="dashboard__item">
        <div className="dashboard__container">
          <div className="dashboard__icon">
            <BsCart />
          </div>
          <div className="dashboard__text">
            <h3 className="dashboard__title">Total Order</h3>
            <p className="dashboard__value">25</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContainers;

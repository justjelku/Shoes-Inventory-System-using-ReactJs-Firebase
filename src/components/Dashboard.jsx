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
  const [productOut, setProductOut] = useState(null);
  const [productIn, setProductIn] = useState(null);
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

  useEffect(() => {
    const getTotalProductOut = async () => {
      const querySnapshot = await getDocs(collection(db, 'users', 'qIglLalZbFgIOnO0r3Zu', 'basic_users', userId, 'products'));
      let total = 0;
      let zeroQtyCount = 0;
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.productQuantity) {
          total += parseInt(data.productQuantity);
        } else {
          zeroQtyCount++;
        }
      });
      console.log(`Total quantities: ${total}`);
      console.log(`Total products with quantity of zero: ${zeroQtyCount}`);
      setProductOut(zeroQtyCount);
    };
    
    if (userId) {
      getTotalProductOut();
    }
  }, [userId]);

  useEffect(() => {
    const getTotalProductIn = async () => {
      const querySnapshot = await getDocs(collection(db, 'users', 'qIglLalZbFgIOnO0r3Zu', 'basic_users', userId, 'products'));
      let total = 0;
      let nonZeroQtyCount = 0;
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.productQuantity && parseInt(data.productQuantity) > 0) {
          total += parseInt(data.productQuantity);
          nonZeroQtyCount++;
        }
      });
      console.log(`Total quantities: ${total}`);
      console.log(`Total products with quantity greater than zero: ${nonZeroQtyCount}`);
      setProductIn(nonZeroQtyCount);
    };
    
    if (userId) {
      getTotalProductIn();
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
            <h3 className="dashboard__title">Product In</h3>
            <p className="dashboard__value">{productIn}</p>
          </div>
        </div>
      </div>
      <div className="dashboard__item">
        <div className="dashboard__container">
          <div className="dashboard__icon">
            <BsClipboardData />
          </div>
          <div className="dashboard__text">
            <h3 className="dashboard__title">Total Products</h3>
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
            <h3 className="dashboard__title">Product Out</h3>
            <p className="dashboard__value">{productOut}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContainers;

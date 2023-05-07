import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
import { db } from '../firebase';
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [productTitle, setproductTitle] = useState('');
  const [productPrice, setproductPrice] = useState('');
  const [productBranch, setproductBranch] = useState('');
  const [productSize, setproductSize] = useState('');
  const [productQuantity, setproductQuantity] = useState('');
  const [productDetails, setproductDetails] = useState('');


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
      const getProduct = query(collection(db, 'users', 'qIglLalZbFgIOnO0r3Zu', 'basic_users', userId, 'products'));
      const unsubscribe = onSnapshot(getProduct, (querySnapshot) => {
        let productsArr = [];
        querySnapshot.forEach((doc) => {
          productsArr.push({ ...doc.data(), id: doc.id });
        });
        setProducts(productsArr);
      });
      return () => unsubscribe();
    }
  }, [userId]);

  return products;
}

export async function updateProduct(db, userId, productId, product) {
  await updateDoc(doc(db, 'users', 'qIglLalZbFgIOnO0r3Zu', 'basic_users', userId, 'products', productId), {
    productTitle: product.productTitle,
    productPrice: product.productPrice,
    productBranch: product.productBranch,
    productSize: product.productSize,
    productQuantity: product.productQuantity,
    productDetails: product.productDetails
  });
}


// Delete todo
export async function deleteProduct(db, userId, productId) {
  await deleteDoc(
    doc(db, 'users', 'qIglLalZbFgIOnO0r3Zu', 'basic_users', userId, 'products', productId)
  );
}


// useEffect(() => {
//   if (userId) {
//     const userRef = firebase.firestore()
//       .collection('users')
//       .doc('qIglLalZbFgIOnO0r3Zu')
//       .collection('basic_users')
//       .doc(userId);
//     const productCollection = userRef.collection('products');

//     const unsubscribeProducts = productCollection.onSnapshot((snapshot) => {
//       const data = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setProducts(data);
//     });

//     return () => unsubscribeProducts();
//   }
// }, [userId]);

// Create todo


// const readProducts = (db, userId, setProducts) => {
//   useEffect(() => {
//     const getProduct = query(collection(db, 'users', 'qIglLalZbFgIOnO0r3Zu', 'basic_users', userId, 'products'));
//     const unsubscribe = onSnapshot(getProduct, (querySnapshot) => {
//       let productsArr = [];
//       querySnapshot.forEach((doc) => {
//         productsArr.push({ ...doc.data(), id: doc.id });
//       });
//       setProducts(productsArr);
//     });
//     return () => unsubscribe();
//   }, [userId]);
// };

//readProducts(db, userId, setProducts);


// Update todo in firebase
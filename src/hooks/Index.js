import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

function useProducts(userId) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const userRef = firebase.firestore()
      .collection('users')
      .doc('qIglLalZbFgIOnO0r3Zu')
      .collection('basic_users')
      .doc(userId);
    const productCollection = userRef.collection('products');

    const unsubscribe = productCollection.onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(data);
    });

    return () => unsubscribe();
  }, [userId]);

  return products;
}

// function useProducts(userId) {
// 	const [products, setProducts] = useState([]);
  
// 	useEffect(() => {
// 	  const unsubscribe = firebase.firestore()
// 		.collection(`users/${userId}/basic_users/${userId}/products`)
// 		.onSnapshot((snapshot) => {
// 		  const data = snapshot.docs.map((doc) => ({
// 			id: doc.id,
// 			productName: doc.data().productName,
// 			price: doc.data().price
// 		  }));
// 		  setProducts(data);
// 		});
  
// 	  return () => unsubscribe();
// 	}, [userId]);
  
// 	return products;
//   }
  

function useBasicUserData(userId) {
	const [userData, setUserData] = useState(null);
  
	useEffect(() => {
	  const unsubscribe = firebase.firestore()
		.collection(`users/${userId}/basic_users`)
		.doc(userId)
		.onSnapshot((doc) => {
		  if (doc.exists) {
			setUserData(doc.data());
		  } else {
			setUserData(null);
		  }
		});
  
	  return () => unsubscribe();
	}, [userId]);
  
	return userData;
  }
  
  function useAdminUserData(userId) {
	const [userData, setUserData] = useState(null);
  
	useEffect(() => {
	  const unsubscribe = firebase.firestore()
		.collection(`users/${userId}/admin_users`)
		.doc(userId)
		.onSnapshot((doc) => {
		  if (doc.exists) {
			setUserData(doc.data());
		  } else {
			setUserData(null);
		  }
		});
  
	  return () => unsubscribe();
	}, [userId]);
  
	return userData;
  }

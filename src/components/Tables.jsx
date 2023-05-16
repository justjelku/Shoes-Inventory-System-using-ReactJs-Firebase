import { useState, useEffect, useContext } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { db } from '../firebase';
import { Modal } from '../components/ImageModal'
import {
  query,
  collection,
  onSnapshot,
} from 'firebase/firestore';

export const ContainerTables = () => {
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };


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

  // const handleRowClick = (product) => {
  //   setSelectedProduct(product);
  // };

  return (
    <>
    <table className="table">
      <thead>
        <tr>
          <th>Product ID</th>
          <th>Name</th>
          <th>Size</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Image</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id} onClick={() => handleClick(product)}>
            <td data-label="Product ID">{product.id}</td>
            <td data-label="Name">{product.productTitle}</td>
            <td data-label="Size">{product.productSize}</td>
            <td data-label="Price">{product.productPrice}</td>
            <td data-label="Quantity">{product.productQuantity}</td>
            <td data-label="Image"><img src={product.barcodeUrl} style={{height:'100px', width: '100px',  backgroundColor: 'white' }} alt={product.productTitle}/></td>
          </tr>
        ))}
      </tbody>
    </table>
    {selectedProduct && (
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <img src={selectedProduct.barcodeUrl} style={{maxWidth: '100%', backgroundColor: 'white'}} alt={selectedProduct.productTitle} />
        </Modal>
    )}
  </>
  );
};

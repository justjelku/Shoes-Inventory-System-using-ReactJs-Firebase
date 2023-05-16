import { Button } from 'react-bootstrap';
import { ProductContext } from "../context/ProductContextProvider";
import firebase from 'firebase/compat/app';
import React, { useContext, useEffect, useState } from 'react'
import { Modal } from '../components/Modal'
import ProductForm from "./ProductForm";
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { storage } from '../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";


function AddProduct() {

	// STATE
	const [productId, setProductId] = useState('');
	const [userId, setUserId] = useState('');
	const [barcodeId, setBarcodeId] = useState('');
	const [qrcodeUrl, setQrcodeUrl] = useState('');
	const [barcodeUrl, setBarcodeUrl] = useState('')
	const [showModal, setShowModal] = useState(false)
	const [productTitle, setproductTitle] = useState('')
	const [productSize, setproductSize] = useState('')
	const [productPrice, setproductPrice] = useState('')
	const [productDetails, setproductDetails] = useState('')
	const [productQuantity, setProductQuantity] = useState('')
	const [branch, setBranch] = useState('')
	const [productImage, setproductImage] = useState('')
	const [progresspercent, setProgresspercent] = useState(0);

	useEffect(() => {
		const unsubscribeAuth = firebase.auth().onAuthStateChanged(user => {
		  if (user) {
			setUserId(user.uid);
		  } else {
			setUserId(null);
		  }
		});
	
		return () => unsubscribeAuth();
	  }, [userId]);

	  function getLastProductId(userId) {
		const random = Math.floor(Math.random() * 99999);
		const userPrefix = userId.substring(0, 8);
		const productId = `2023${userPrefix}${random.toString().padStart(5, '0')}`;
		return productId;
	  }
	  
	  useEffect(() => {
		async function fetchProductId() {
		  const user = firebase.auth().currentUser;
		  const userId = user ? user.uid : null;
		  const newProductId = userId ? getLastProductId(userId) : null;
		  setProductId(newProductId);
		}
		fetchProductId();
	  }, [userId]);
	  
	  function handleSubmit(e) {
		e.preventDefault();
		if (!productImage) {
		  alert("Please select an image for your product.");
		  return;
		}
	  
		const storageRef = ref(storage, `products/productImage/${productImage.name}`);
		const uploadTask = uploadBytesResumable(storageRef, productImage);
	  
		uploadTask.on(
		  "state_changed",
		  (snapshot) => {
			const progress = Math.round(
			  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
			);
			setProgresspercent(progress);
		  },
		  (error) => {
			alert(error);
		  },
		  () => {
			getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
			  addDoc(
				collection(
				  db,
				  "users",
				  "qIglLalZbFgIOnO0r3Zu",
				  "basic_users",
				  userId,
				  "products",
				  productId
				),
				{
				  userId,
				  barcodeId,
				  barcodeUrl,
				  qrcodeUrl,
				  productId,
				  productTitle,
				  productPrice: parseInt(productPrice),
				  branch,
				  productSize: parseInt(productSize),
				  productImage: downloadURL,
				  productQuantity: parseInt(productQuantity),
				  productDetails,
				  createdtime: serverTimestamp(), // Add createtime field with current server timestamp
				  updatedtime: serverTimestamp() // Add updatetime field with current server timestamp
				},
				{ merge: true, documentId: productId } // set the document ID to productId
			  );
			  setproductTitle("");
			  setproductPrice("");
			  setBranch("");
			  setproductSize("");
			  setProductQuantity("");
			  setproductDetails("");
			  setproductImage("");
			  setShowModal(false);
			});
		  }
		);
	  }
	  

	return (
		<div className="AddProduct">
			<div className="btn">
				<Button onClick={() => setShowModal(true)}>
					New Product
				</Button>
			</div>
			<Modal showModal={showModal} setShowModal={setShowModal}>
				<ProductForm
					handleSubmit={handleSubmit}
					heading='Add New Product'
					productTitle={productTitle}
					setproductTitle={setproductTitle}
					productSize={productSize}
					setproductSize={setproductSize}
					productPrice={productPrice}
					setproductPrice={setproductPrice}
					productQuantity={productQuantity}
					setproductQuantity={setProductQuantity}
					productDetails={productDetails}
					setproductDetails={setproductDetails}
					productBranch={branch}
					setproductBranch={setBranch}
					productImage={setproductImage}
					setproductImage={setproductImage}
					generateBarcodeButton={true}
					showButtons={true}
					setShowModal={setShowModal}
				/>
			</Modal>
		</div>
	);
}

export default AddProduct;
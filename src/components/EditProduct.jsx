import { Button } from 'react-bootstrap';
import { ProductContext } from "../context/ProductContextProvider";
import firebase from 'firebase/compat/app';
import React, { useContext, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { Modal } from '../components/Modal'
import EditProductForm from "./EditProductForm";
import { db } from '../firebase';
import { collection, addDoc, query, onSnapshot, } from 'firebase/firestore';
import { storage } from '../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";


const EditProduct = ({ productId }) => {

	// STATE
	const [product, setProduct] = useState(null);
	const [selectedProduct, setSelectedProduct] = useState(null);
	// const [productId, setProductId] = useState();
	const [userId, setUserId] = useState(null);
	const [showModal, setShowModal] = useState(false)
	const [productTitle, setProductTitle] = useState()
	const [productSize, setproductSize] = useState()
	const [productPrice, setproductPrice] = useState()
	const [productDetails, setproductDetails] = useState()
	const [productQuantity, setProductQuantity] = useState()
	const [productBranch, setproductBranch] = useState()
	const [productImage, setproductImage] = useState()
	const [progresspercent, setProgresspercent] = useState(0)


	function handleSubmit(e) {

	}

	useEffect(() => {
		const fetchProductDetails = async () => {
			try {
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
						querySnapshot.forEach((doc) => {
							if (doc.id === productId) {
								setSelectedProduct({ id: doc.id, ...doc.data() });
							}
						});
					});
					return () => unsubscribe();
				}
			} catch (error) {
				console.error('Error fetching product details:', error);
			}
		};

		fetchProductDetails();
	}, [productId, userId]);

	useEffect(() => {
		if (selectedProduct) {
			setProductTitle(selectedProduct.productTitle)
			setproductSize((selectedProduct.productSize))
			setproductPrice((selectedProduct.productPrice))
			setproductDetails(selectedProduct.productDetails)
			setProductQuantity(selectedProduct.productQuantity)
			setproductBranch((selectedProduct.productBranch))
			setproductImage((selectedProduct.productImage))
		}
	}, [selectedProduct])

	useEffect(() => {
		if (selectedProduct) {
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
							).doc(selectedProduct.id)
								.update({
									productId,
									productTitle,
									productPrice,
									productBranch,
									productSize,
									productImage: downloadURL,
									productQuantity,
									productDetails,
								})
						);
					});
				}
			);
		}

	}, [productTitle, productSize, productPrice, productDetails, productQuantity, productBranch, productImage])

	return (
		<div>
			{selectedProduct && (
				<div>
					<img
						src={selectedProduct.barcodeUrl}
						style={{ maxWidth: '10%', backgroundColor: 'white' }}
						alt={selectedProduct.productImage}
					/>
					<img
						src={selectedProduct.barcodeUrl}
						style={{ maxWidth: '10%', backgroundColor: 'white' }}
						alt={selectedProduct.productTitle}
					/>
					<EditProductForm
						handleSubmit={handleSubmit}
						heading="Edit Product"
						productTitle={selectedProduct.productTitle}
						setProductTitle={setProductTitle}
						productSize={selectedProduct.productSize}
						setProductSize={setproductSize}
						productPrice={selectedProduct.productPrice}
						setProductPrice={setproductPrice}
						productQuantity={selectedProduct.productQuantity}
						setProductQuantity={setProductQuantity}
						productDetails={selectedProduct.productDetails}
						setProductDetails={setproductDetails}
						productBranch={selectedProduct.branch}
						setProductBranch={setproductBranch}
						productImage={selectedProduct.productImage}
						setProductImage={setproductImage}
						generateBarcodeButton={true}
						showButtons={true}
					/>
				</div>
			)}
		</div>
	);
};

export default EditProduct;
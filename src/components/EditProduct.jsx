import { Button } from 'react-bootstrap';
import { ProductContext } from "../context/ProductContextProvider";
import firebase from 'firebase/compat/app';
import React, { useContext, useEffect, useState } from 'react'
import { Modal } from '../components/Modal'
import ProductForm from "./ProductForm";
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { storage } from '../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";


function EditProduct() {

	// STATE
	const [productId, setProductId] = useState();
	const [userId, setUserId] = useState(null);
	const [showModal, setShowModal] = useState(false)
	const [productTitle, setproductTitle] = useState()
	const [productSize, setproductSize] = useState()
	const [productPrice, setproductPrice] = useState()
	const [productDetails, setproductDetails] = useState()
	const [productQuantity, setProductQuantity] = useState()
	const [productBranch, setproductBranch] = useState()
	const [productImage, setproductImage] = useState()
	const [progresspercent, setProgresspercent] = useState(0)

	const { selectedProduct } = useState()

	function handleSubmit(e){

	}

	useEffect(() => {
        if(selectedProduct){
            setproductTitle(selectedProduct.productTitle)
            setproductSize((selectedProduct.productSize))
            setproductPrice((selectedProduct.productPrice))
            setproductDetails(selectedProduct.productDetails)
			setProductQuantity(selectedProduct.productQuantity)
            setproductBranch((selectedProduct.productBranch))
            setproductImage((selectedProduct.productImage))
        }
    }, [selectedProduct])

	useEffect(() => {
        if(selectedProduct){
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
			{
				selectedProduct &&
				<div className='EditProduct'>
					<div className='header'>
						Edit Product
					</div>
					<div className='container'>
						<Modal showModal={showModal} setShowModal={setShowModal}>
						<ProductForm
							handleSubmit={handleSubmit}
							heading='EditProduct'
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
							productBranch={productBranch}
							setproductBranch={setproductBranch}
							productImage={setproductImage}
							setproductImage={setproductImage}
							generateBarcodeButton={true}
							showButtons={true}
							setShowModal={setShowModal}
						/>
						</Modal>
					</div>

				</div>
			}
		</div>
	)
}

export default EditProduct;
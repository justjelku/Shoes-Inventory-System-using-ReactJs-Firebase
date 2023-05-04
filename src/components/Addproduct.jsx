import { Button } from 'react-bootstrap';
import { ProductContext } from "../context/ProductContextProvider";
import firebase from 'firebase/compat/app';
import React, {useContext, useEffect, useState} from 'react'
import { Modal } from '../components/Modal'
import ProductForm from "./ProductForm";


function AddProduct(){

	// STATE
    const [showModal, setShowModal] = useState(false)
	const [productTitle, setproductTitle] = useState('')
	const [productSize, setproductSize] = useState('')
	const [productPrice, setproductPrice] = useState('')
	const [productDetails, setproductDetails] = useState('')
	const [productBranch, setproductBranch] = useState('')
	const [productImage, setproductImage] = useState('')

	function handleSubmit(e){
		
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
                    productDetails={productDetails}
                    setproductDetails={setproductDetails}
					productBranch={productBranch}
					setproductBranch = {setproductBranch}
                    productImage={productImage}
					setproductImage={setproductImage}
                    generateBarcodeButton={true}
					showButtons = {true}
                    setShowModal={setShowModal}
                />
            </Modal>
		</div>
	 );
}
 
export default AddProduct;
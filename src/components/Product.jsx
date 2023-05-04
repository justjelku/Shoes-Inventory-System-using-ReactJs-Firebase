import React, {useContext, useState} from 'react'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { ProductContext } from '../context/ProductContextProvider';

function Product({product}){
	// STATE
    const [hover, setHover] = useState(false)

	// CONTEXT
    const { selectedProduct, setSelectedProduct} = useContext(ProductContext)

	const handleDelete = () => {
		deleteProduct(product.id);
	  
		if (selectedProduct === product) {
		  setSelectedProduct(undefined);
		}
	  }	  

	const deleteProduct = (productId) => {
		firebase
		  .firestore()
		  .collection('users')
		  .doc('qIglLalZbFgIOnO0r3Zu')
		  .collection('basic_users')
		  .doc(userId)
		  .collection('products')
		  .doc(productId)
		  .delete()
		  .then(() => {
			console.log(`Product with ID ${productId} successfully deleted`);
		  })
		  .catch((error) => {
			console.error(`Error deleting product with ID ${productId}: ${error}`);
		  });
	  }
	  

	return ( 
		<div className='Product'>
			<div
				className='product-container'
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
			>
			</div>
		</div>
	 );
}
 
export default Product;
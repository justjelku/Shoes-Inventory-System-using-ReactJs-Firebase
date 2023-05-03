import React, {useContext, useState} from 'react'
import firebase from 'firebase/compat/app';
import { ProductContext } from '../context/ProductContextProvider';
import AddProduct from './Addproduct';
import Product from './Product';

function Products({product}){
	return ( 
		<div className='Products'>
			<AddProduct />
			<Product />
		</div>
	 );
}
 
export default Products;
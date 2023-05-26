import { Button } from 'react-bootstrap'
import { X } from 'react-bootstrap-icons'
import React, { useContext, useEffect, useState } from 'react'

function ProductForm({
	handleSubmit,
	heading = false,
	productTitle, setproductTitle,
	productSize, setproductSize,
	productPrice, setproductPrice,
	productDetails, setproductDetails,
	productBranch, setproductBranch,
	productImage, setproductImage,
	productQuantity, setproductQuantity,
	generateBarcodeButton,
	showButtons = false,
	setShowModal = false
}) {
	const handleImageChange = (event) => {
		const file = event.target?.files[0];
		setproductImage(file);
	  };

	return (
		<form onSubmit={handleSubmit} className='ProductForm'>
			<div className="heading">
				{
					heading &&
					<h3>{heading}</h3>
				}
			</div>
			<div className="productSize">
				<input
					type='text'
					value={productTitle}
					onChange={e => setproductTitle(e.target.value)}
					placeholder='Product Title'
					autoFocus
				/>
			</div>
			<div className="productSize">
				<input
					type='number'
					value={productSize}
					onChange={e => setproductSize(e.target.value)}
					placeholder='Size'
					autoFocus
				/>
			</div>
			<div className='productQuantity'>
				<input
					type='number'
					value={productQuantity}
					onChange={e => setproductQuantity(e.target.value)}
					placeholder='Quantity'
					autoFocus
				/>
			</div>
			<div className="productPrice">
				<input
					type='number'
					value={productPrice}
					onChange={e => setproductPrice(e.target.value)}
					placeholder='Price'
					autoFocus
				/>
			</div>
			<div className="productDetails">
				<input
					type='text'
					value={productDetails}
					onChange={e => setproductDetails(e.target.value)}
					placeholder='Details'
					autoFocus
				/>
			</div>
			<div className="productBranch">
				<input
					type='text'
					value={productBranch}
					onChange={e => setproductBranch(e.target.value)}
					placeholder='Branch'
					autoFocus
				/>
			</div>
			<div className="productImage">
				<input
					type='file'
					// value={productImage}
					accept='image/*'
					onChange={handleImageChange}
				/>
			</div>
			{
				showButtons &&
				<div>
					<div className="cancel" onClick={() => setShowModal(false)}>
						<X size='40' />
					</div>
					<div className="confirm">
						<button>Submit</button>
					</div>
				</div>
			}
		</form>
	)
}

export default ProductForm
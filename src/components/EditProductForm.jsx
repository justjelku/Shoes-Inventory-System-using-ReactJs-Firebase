import { Button } from 'react-bootstrap'
import { X } from 'react-bootstrap-icons'
import React, { useContext, useEffect, useState } from 'react'
import { XIcon } from '@heroicons/react/outline';

function EditProductForm({
	handleSubmit,
	product,
	heading = false,
	setShowModal = false,
	showButtons = false,
}) {
	const [productTitle, setproductTitle] = useState('');
	const [productSize, setproductSize] = useState('');
	const [productPrice, setproductPrice] = useState('');
	const [productDetails, setproductDetails] = useState('');
	const [productBranch, setproductBranch] = useState('');
	const [productImage, setproductImage] = useState(null);
	const [productQuantity, setProductQuantity] = useState('');

	useEffect(() => {
		if (product) {
			setproductTitle(product.productTitle);
			setproductSize(product.productSize);
			setproductPrice(product.productPrice);
			setproductDetails(product.productDetails);
			setproductBranch(product.productBranch);
			// ... set other state values based on the available product properties
		}
	}, [product]);
	const handleImageChange = (event) => {
		const file = event.target?.files[0];
		setproductImage(file);
	};

	return (
		<form onSubmit={handleSubmit} className="w-full max-w-xs">
			<div className="heading">
				{heading && <h3>{heading}</h3>}
			</div>
			<div className="productSize">
				<input
					type="text"
					value={productTitle}
					onChange={(e) => setproductTitle(e.target.value)}
					placeholder="Product Title"
					autoFocus
					className="border border-gray-300 rounded-md p-10 w-full"
				/>
			</div>
			<div className="productSize">
				<input
					type="number"
					value={productSize}
					onChange={(e) => setproductSize(e.target.value)}
					placeholder="Size"
					autoFocus
					className="border border-gray-300 rounded-md p-2 w-full"
				/>
			</div>
			<div className="productQuantity">
				<input
					type="number"
					value={productQuantity}
					onChange={(e) => setProductQuantity(e.target.value)}
					placeholder="Quantity"
					autoFocus
					className="border border-gray-300 rounded-md p-2 w-full"
				/>
			</div>
			<div className="productPrice">
				<input
					type="number"
					value={productPrice}
					onChange={(e) => setproductPrice(e.target.value)}
					placeholder="Price"
					autoFocus
					className="border border-gray-300 rounded-md p-2 w-full"
				/>
			</div>
			<div className="productDetails">
				<input
					type="text"
					value={productDetails}
					onChange={(e) => setproductDetails(e.target.value)}
					placeholder="Details"
					autoFocus
					className="border border-gray-300 rounded-md p-2 w-full"
				/>
			</div>
			<div className="productBranch">
				<input
					type="text"
					value={productBranch}
					onChange={(e) => setproductBranch(e.target.value)}
					placeholder="Branch"
					autoFocus
					className="border border-gray-300 rounded-md p-2 w-full"
				/>
			</div>
			<div className="productImage">
				<input
					type="file"
					accept="image/*"
					onChange={handleImageChange}
					className="mb-4"
				/>
			</div>
			{showButtons && (
				<div className="flex justify-end">
					<div className="cancel" onClick={() => setShowModal(false)}>
						<XIcon className="h-8 w-8 text-gray-600 cursor-pointer" />
					</div>
					<div className="confirm">
						<button
							type="submit"
							className="bg-blue-500 text-white rounded-md px-4 py-2 ml-2"
						>
							Submit
						</button>
					</div>
				</div>
			)}
		</form>
	);
}

export default EditProductForm;

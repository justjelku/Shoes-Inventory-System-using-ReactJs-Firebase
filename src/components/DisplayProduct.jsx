import React from 'react';
import '../App.scss';
import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useRoutes } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import DisplayProduct from './DisplayProduct';
import EditProductForm from './EditProductForm';

function StackedCard({
	productTitle,
	productSize,
	productPrice,
	productDetails,
	productBranch,
	productImage,
	productQuantity,
	barcodeUrl,
	sizeSystem,
	qrcodeUrl,
	category,
	color
}) {

	const navigate = useNavigate();
	const [showEditModal, setShowEditModal] = useState(false);
	const [product, setProducts] = useState([]);
	const [userId, setUserId] = useState(null);
	const [selectedProduct, setSelectedProduct] = useState(null);

	const routes = [
		{
		  path: '/edit/:productId',
		  element: <EditProductForm product={selectedProduct} />,
		},
	  ];
	
	  const routing = useRoutes(routes);

	const handleEdit = (e, product) => {
		e.stopPropagation();
		setSelectedProduct(product);
	
		// Navigate to the edit page with the selected product's ID
		navigate(`/edit/${product.productId}`);
	
	  };

	return (
		<div className="StackedCard">
			<div className="px-6 py-4 edit" >
				<FontAwesomeIcon icon={faEdit} className="card-edit" onClick={(e) => handleEdit(e, product)} />
			</div>
			<div className="px-6 py-4 images">
				<img
					className="w-full mx-auto stacked-card-image"
					src={productImage}
					alt={productTitle}
				/>
			</div>
			<div className="px-6 py-4 card-heading">
				<div className="card-title">{productTitle}</div>
				<p className="card-subtitle">{category}</p>
				<p className="card-subtitle">{color}</p>
				<p className="card-description">{productDetails}</p>
			</div>
			<div className="px-6 pt-4 pb-2 card-info">
				<span className="info-item">{sizeSystem} {productSize}</span>
				<span className="info-item">&#8369;{productPrice}</span>
				<span className="info-item">{productQuantity} Quantities</span>
			</div>
			<div className="px-6 py-4 barcode-qr-images">
				<img
					className="w-full mx-auto stacked-card-qrcode"
					src={qrcodeUrl}
					alt={productTitle}
				/>
				<img
					className="w-full mx-auto stacked-card-barcode"
					src={barcodeUrl}
					alt={productTitle}
				/>
			</div>
		</div>
	);
}

export default StackedCard;

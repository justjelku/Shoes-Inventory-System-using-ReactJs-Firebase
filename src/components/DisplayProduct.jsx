import React from 'react';
import '../App.scss';

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
	return (
		<div className="StackedCard">
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

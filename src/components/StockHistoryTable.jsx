import { useState, useEffect, useContext } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { db } from '../firebase';
import { Modal } from '../components/ImageModal'
import {
	query,
	collection,
	onSnapshot,
} from 'firebase/firestore';

const StockInTab = ({ product }) => {
	// Render stock in content here
	return <div>Stock In Tab Content</div>;
};

const StockOutTab = ({ product }) => {
	// Render stock out content here
	return <div>Stock Out Tab Content</div>;
};


export const StockHistoryTable = () => {
	const [products, setProducts] = useState([]);
	const [stockInProducts, setStockInProducts] = useState([]);
	const [stockOutProducts, setStockOutProducts] = useState([]);
	const [userId, setUserId] = useState(null);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [activeTab, setActiveTab] = useState('stockIn');

	const handleTab = (product) => {
		setSelectedProduct(product);
		setActiveTab('stockIn');
		setShowModal(true);
	};

	const handleClick = (product) => {
		setSelectedProduct(product);
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
	};


	useEffect(() => {
		const unsubscribeAuth = firebase.auth().onAuthStateChanged(user => {
			if (user) {
				setUserId(user.uid);
			} else {
				setUserId(null);
			}
		});

		return () => unsubscribeAuth();
	}, []);

	useEffect(() => {
		if (userId) {
			const stockInQuery = query(
				collection(
					db,
					'users',
					'qIglLalZbFgIOnO0r3Zu',
					'basic_users',
					userId,
					'stock_in'
				)
			);

			const stockOutQuery = query(
				collection(
					db,
					'users',
					'qIglLalZbFgIOnO0r3Zu',
					'basic_users',
					userId,
					'stock_out'
				)
			);

			const unsubscribeStockIn = onSnapshot(stockInQuery, (querySnapshot) => {
				let stockInProducts = [];
				querySnapshot.forEach((doc) => {
					stockInProducts.push({ id: doc.id, productTitle: doc.productTitle, ...doc.data() });
				});

				// Sort stockInProducts array by 'soldAt' field in descending order
				stockInProducts.sort((a, b) => b.soldAt - a.soldAt);

				setStockInProducts(stockInProducts);
			});

			const unsubscribeStockOut = onSnapshot(stockOutQuery, (querySnapshot) => {
				let stockOutProducts = [];
				querySnapshot.forEach((doc) => {
					stockOutProducts.push({ id: doc.id, productTitle: doc.productTitle, ...doc.data() });
				});

				// Sort stockOutProducts array by 'soldAt' field in descending order
				stockOutProducts.sort((a, b) => b.soldAt - a.soldAt);

				setStockOutProducts(stockOutProducts);
			});

			return () => {
				unsubscribeStockIn();
				unsubscribeStockOut();
			};
		}
	}, [userId]);


	// const handleRowClick = (product) => {
	//   setSelectedProduct(product);
	// };

	const handleEdit = (e, product) => {
		e.stopPropagation(); // Prevent the row click event from firing
		// Handle edit functionality here
	};

	const handleDelete = (e, product) => {
		e.stopPropagation(); // Prevent the row click event from firing
		// Handle delete functionality here
	};

	const handleTabChange = (tab) => {
		setActiveTab(tab);
	};

	// Render the merged products array
	const mergedProducts = [...stockInProducts, ...stockOutProducts];


	return (
		<>
			<table className="table">
				<thead>
					<tr>
						<th>Product ID</th>
						<th>Name</th>
						<th>Category</th>
						<th>Branch</th>
						<th>Brand</th>
						<th>Size</th>
						<th>Price</th>
						<th>Quantity</th>
						<th>Image</th>
						<th>Type</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{mergedProducts.map((product) => (
						// <tr key={product.id} onClick={() => handleTab(product)}></tr>
						<tr key={product.id}>
							<td data-label="Product ID">{product.id}</td>
							<td data-label="Name">{product.productTitle}</td>
							<td data-label="Category">{product.category}</td>
							<td data-label="Branch">{product.branch}</td>
							<td data-label="Brand">{product.productBrand}</td>
							<td data-label="Size">{product.productSize}</td>
							<td data-label="Price">{product.productPrice}</td>
							<td data-label="Quantity">{product.productQuantity}</td>
							<td data-label="Image"><img src={product.barcodeUrl} style={{ height: '100px', width: '100px', backgroundColor: 'white' }} alt={product.productTitle} onClick={() => handleClick(product)} /> </td>
							<td data-label="Type">{product.type} <td colSpan="10">
								<div className="text-xs italic text-gray-500">
									{product.soldAt.toDate().toLocaleString()}
								</div>
							</td></td>
							<td data-label="Action"> {/* Add the "Action" column */}
								<div className="flex space-x-2">
									<button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded" onClick={(e) => handleEdit(e, product)}>Edit</button>
									<button className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded" onClick={(e) => handleDelete(e, product)}>Delete</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{selectedProduct && (
				<Modal showModal={showModal} setShowModal={setShowModal}>
					<div className="flex flex-col items-center">
						<img src={selectedProduct.barcodeUrl} style={{ maxWidth: '50%', backgroundColor: 'white' }} alt={selectedProduct.productTitle} />
					</div>
				</Modal>
			)}
		</>
	);
};
